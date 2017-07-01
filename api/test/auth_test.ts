import { request, login } from "./common";
import { cleanCollection } from "../models/user";

describe("# Auth", () => {
    const endpoint = process.env.API_BASE + "login";

    it("should retrieve the token", () => {
        return cleanCollection().then(res => {
            return login().then(res => {
                res.status.should.equal(200);
                res.body.token.should.not.be.empty; // jshint ignore:line
            });
        });
    });

    it("should not login with the right user but wrong password", () => {
        return request.post(endpoint)
            .send({ "username": "testuser", "password": "anythingGoesHere" })
            .expect(401);
    });

    it("should return invalid credentials error", () => {
        return request.post(endpoint)
            .send({ "username": "testuser", "password": "" })
            .expect(401);
    });

    it("should return token expired message", () => {
        return request.post(process.env.API_BASE + "tasks")
            .set("Authorization", "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NzM2NjYyOTIsInVzZXJuYW1lIjoiaW5mb0BtYXV0aWx1cy5jb20ifQ.zH5Vfdcy7a3iSnVZcqGHNvcWwgvhFh1_n8uMvFr5Dl8")
            .send({
                name: "Do the dishes"
            })
            .expect(res => res.body.message.should.equal("Your token has expired. Please generate a new one"))
            .expect(401);
    });
});
