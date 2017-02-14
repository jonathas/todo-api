import * as jwt from "jwt-simple";
import * as passport from "passport";
import * as moment from "moment";
import {Strategy, ExtractJwt} from "passport-jwt";
import {model as User, IUser} from "../models/user";

class Auth {

    public initialize = () => {
        passport.use("jwt", this.getStrategy());
        return passport.initialize();
    }

    public authenticate = (callback) => passport.authenticate("jwt", {session: process.env.JWT_CONFIG_SESSION, failWithError: process.env.JWT_CONFIG_SESSION_FAILWITHERROR}, callback)

    private genToken = (user: IUser): Object => {
        let expires = moment().utc().add({ days: 7 }).unix();
        let token = jwt.encode({
            exp: expires,
            username: user.username
        }, process.env.JWT_SECRET);

        return {
            token: "JWT " + token,
            expires: moment.unix(expires).format(),
            user: user._id
        };
    }

    public login = (req, res) => {
        try {
            req.checkBody("username", "Invalid username").notEmpty();
            req.checkBody("password", "Invalid password").notEmpty();

            let errors = req.validationErrors();
            if (errors) throw errors;

            /* istanbul ignore next */
            let genToken = this.genToken;
            User.findOne({ "username": req.body.username }, (err, user) => {
                /* istanbul ignore next: exception catching already tested for throw above */
                if (err) throw err;

                if (user === null || !user.comparePassword(req.body.password)) {
                    return res.status(401).json({ "message": "Invalid credentials" });
                }

                res.status(200).json(genToken(user));
            });
        } catch (err) {
            res.status(401).json({ "message": "Invalid credentials", "errors": err });
        }
    }

    private getStrategy = (): Strategy => {
        const params = {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
            passReqToCallback: true
        };

        return new Strategy(params, (req, payload: any, done) => {
            User.findOne({ "username": payload.username }, (err, user) => {
                /* istanbul ignore next: passport response */
                if (err) {
                    return done(err);
                }
                /* istanbul ignore next: passport response */
                if (user === null) {
                    return done(null, false, { message: "The user in the token was not found" });
                }

                return done(null, { username: user.username, timezone: user.timezone });
            });
        });
    }

}

export default new Auth();
