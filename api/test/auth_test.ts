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
            .expect(401)
            .then(res => {
                return request.post(endpoint)
                    .send({ "username": "anotherusername", "password": "mypass" })
                    .expect(401);
            });
    });

    it("should return token expired message", () => {
        return request.post(process.env.API_BASE + "tasks")
            .set("Authorization", "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTg5Mzk1MTksInVzZXJuYW1lIjoidGVzdHVzZXIifQ.FUJcVCzZTkjDr62MCJj5gvCFvmxewmz2jotiknuVbOg")
            .send({
                name: "Do the dishes"
            })
            .expect(res => res.body.message.should.equal("Your token has expired. Please generate a new one"))
            .expect(401);
    });
});
