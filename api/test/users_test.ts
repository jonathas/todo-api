import { request, login, chai } from "./common";

describe("# Users", () => {
    const endpoint = process.env.API_BASE + "users";
    let token;
    let userId;

    before(() => {
        return login().then(res => {
            token = res.body.token;
            return res;
        })
    });

    it("should add some users", () => {
        return request.post(endpoint)
            .set("Authorization", token)
            .send({ "name": "Jonathas", "username": "jon", "password": "mynicepass" })
            .expect(res => res.body.message.should.equal("User saved successfully!"))
            .expect(201)
            .then(res => {
                return request.post(endpoint)
                .set("Authorization", token)
                .send({ "name": "Jon", "username": "jonathas", "password": "myverysecretpass" })
                .expect(res => {
                    userId = res.body.id;
                    res.body.message.should.equal("User saved successfully!");
                })
                .expect(201);
            });
    });

    it("should not add a user when no data is sent", () => {
        return request.post(endpoint)
            .set("Authorization", token)
            .send({})
            .expect(res => {
                res.body.message.should.equal("Missing parameters");
            })
            .expect(400);
    });

    it("should update a user", () => {
        return request.put(endpoint + "/" + userId)
            .set("Authorization", token)
            .send({ name: "new user" })
            .expect(res => res.body.message.should.equal("User updated successfully!"))
            .expect(200);
    });

    it("should not update a user when no data is sent", () => {
        return request.put(endpoint + "/" + userId)
            .set("Authorization", token)
            .send({})
            .expect(400);
    });

    it("should return bad request for trying to update a user with a malformed id", () => {
        return request.put(endpoint + "/anything")
            .set("Authorization", token)
            .send({ name: "something else" })
            .expect(400);
    });

    it("should retrieve a user", () => {
        return request.get(endpoint + "/" + userId)
            .set("Authorization", token)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => res.body._id.should.equal(userId))
            .expect(200);
    });

    it("should retrieve all users", () => {
        return request.get(endpoint)
            .set("Authorization", token)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => chai.expect(res.body).to.have.length.of.at.least(1))
            .expect(200);
    });

    it("should return bad request for trying to retrieve a user with a malformed id", () => {
        return request.get(endpoint + "/anything")
            .set("Authorization", token)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400);
    });

    it("should return not found for a non existent user", () => {
        return request.get(endpoint + "/57d6e440b80470c440b3401f")
            .set("Authorization", token)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(404);
    });

    it("should return bad request for trying to delete a user with a malformed id", () => {
        return request.delete(endpoint + "/anything")
            .set("Authorization", token)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400);
    });

    it("should delete a user", () => {
        return request.delete(endpoint + "/" + userId)
            .set("Authorization", token)
            .expect(res => res.body.message.should.equal("User deleted successfully!"))
            .expect(200);
    });

    describe("# Without authentication", () => {
        it("should not be able to add a user", () => {
            return request.post(endpoint)
                .send({
                    name: "myuser"
                })
                .expect(401);
        });

        it("should not be able to update a user", () => {
            return request.put(endpoint + "/" + userId)
                .send({ name: "not update" })
                .expect(401);
        });

        it("should not be able to retrieve a user", () => {
            return request.get(endpoint + "/" + userId)
                .set("Accept", "application/json")
                .expect(401);
        });

        it("should not be able to retrieve all users", () => {
            return request.get(endpoint)
                .set("Accept", "application/json")
                .expect(401);
        });

        it("should not be able to delete a user", () => {
            return request.delete(endpoint + "/" + userId)
                .expect(401);            
        });
    });

});