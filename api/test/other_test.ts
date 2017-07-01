import {request} from "./common";

describe("# Not configured routes", () => {
    it("should return 404", (done) => {
        request.get("/aRandomEndpoint")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect((res) => res.body.error.should.equal("Endpoint not found"))
            .expect(404, done);
    });
});
