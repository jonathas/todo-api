import { request, login } from "./common";

describe("# Tasks", () => {
    const endpoint = process.env.API_BASE + "tasks";
    let token;
    let task;

    before(() => {
        return login().then(res => {
            token = res.body.token;
            return res;
        })
    });

    it("should add some tasks");

    it("should not add a task when no data is sent");

    it("should update a task");

    it("should not update a task when no data is sent");

    it("should return bad request for trying to update a task with a malformed id");

    it("should retrieve a task");

    it("should retrieve all tasks");

    it("should return bad request for trying to retrieve a task with a malformed id");

    it("should return not found for a non existent task");

    it("should return bad request for trying to delete a task with a malformed id");

    it("should delete a task");

    describe("# Without authentication", () => {
        it("should not be able to add a task");

        it("should not be able to update a task");

        it("should not be able to retrieve a task");

        it("should not be able to retrieve all tasks");

        it("should not be able to delete a task");
    });

});