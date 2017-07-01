import { request, login, chai } from "./common";

describe("# Tasks", () => {
    const endpoint = process.env.API_BASE + "tasks";
    let token;
    let taskId;

    before(() => {
        return login().then(res => {
            token = res.body.token;
            return res;
        })
    });

    it("should add some tasks", () => {
        return request.post(endpoint)
            .set("Authorization", token)
            .send({ "name": "Do the dishes" })
            .expect(res => res.body.message.should.equal("Task saved successfully!"))
            .expect(201)
            .then(res => {
                return request.post(endpoint)
                .set("Authorization", token)
                .send({ "name": "Run in the park" })
                .expect(res => {
                    taskId = res.body.id;
                    res.body.message.should.equal("Task saved successfully!");
                })
                .expect(201);
            });
    });

    it("should not add a task when no data is sent", () => {
        return request.post(endpoint)
            .set("Authorization", token)
            .send({})
            .expect(res => {
                res.body.message.should.equal("Missing parameters");
            })
            .expect(400);
    });

    it("should update a task", () => {
        return request.put(endpoint + "/" + taskId)
            .set("Authorization", token)
            .send({ name: "Take out the trash" })
            .expect(res => res.body.message.should.equal("Task updated successfully!"))
            .expect(200);
    });

    it("should not update a task when no data is sent", () => {
        return request.put(endpoint + "/" + taskId)
            .set("Authorization", token)
            .send({})
            .expect(400);
    });

    it("should return bad request for trying to update a task with a malformed id", () => {
        return request.put(endpoint + "/anything")
            .set("Authorization", token)
            .send({ name: "something else" })
            .expect(400);
    });

    it("should retrieve a task", () => {
        return request.get(endpoint + "/" + taskId)
            .set("Authorization", token)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => res.body._id.should.equal(taskId))
            .expect(200);
    });

    it("should retrieve all tasks", () => {
        return request.get(endpoint)
            .set("Authorization", token)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => chai.expect(res.body).to.have.length.of.at.least(1))
            .expect(200);
    });

    it("should return bad request for trying to retrieve a task with a malformed id", () => {
        return request.get(endpoint + "/anything")
            .set("Authorization", token)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400);
    });

    it("should return not found for a non existent task", () => {
        return request.get(endpoint + "/57d6e440b80470c440b3401f")
            .set("Authorization", token)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(404);
    });

    it("should return bad request for trying to delete a task with a malformed id", () => {
        return request.delete(endpoint + "/anything")
            .set("Authorization", token)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400);
    });

    it("should delete a task", () => {
        return request.delete(endpoint + "/" + taskId)
            .set("Authorization", token)
            .expect(res => res.body.message.should.equal("Task deleted successfully!"))
            .expect(200);
    });

    describe("# Without authentication", () => {
        it("should not be able to add a task", () => {
            return request.post(endpoint)
                .send({
                    name: "task"
                })
                .expect(401);
        });

        it("should not be able to update a task", () => {
            return request.put(endpoint + "/" + taskId)
                .send({ name: "not update" })
                .expect(401);
        });

        it("should not be able to retrieve a task", () => {
            return request.get(endpoint + "/" + taskId)
                .set("Accept", "application/json")
                .expect(401);
        });

        it("should not be able to retrieve all tasks", () => {
            return request.get(endpoint)
                .set("Accept", "application/json")
                .expect(401);
        });

        it("should not be able to delete a task", () => {
            return request.delete(endpoint + "/" + taskId)
                .expect(401);            
        });
    });

});