const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const app = require("../app");

describe("Queries", function () {
    describe("Setup", function () {
        it("Should return that the application is running", function (done) {
            chai.request(app)
                .get("/questions")
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.type.should.equal("application/json");
                    res.body.should.equal("Question service is running succsesfully");
                    done();
                });
        });
    });
});
