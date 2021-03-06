const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const app = require("../app");

const CATEGORY = require("../models/CATEGORY");
const DIFFICULTY = require("../models/DIFFICULTY");

describe("Queries", function () {
    describe("Setup", function () {
        it("Should return that the application is running", function (done) {
            chai.request(app)
                .get("/question")
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.type.should.equal("application/json");
                    res.body.should.equal("Question service is running succsesfully");
                    done();
                });
        });
    });

    describe("Get Question", function () {
        it("Should return that the EASY question is SUCCESSFULLY received", function (done) {
            chai.request(app)
                .get(`/question/${DIFFICULTY.easy}`)
                .query({ category: CATEGORY.array })
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.type.should.equal("application/json");
                    question = res.body.questions[0];
                    should.equal(res.body.questions.length, 1);
                    should.exist(question);
                    should.equal(question.difficulty, DIFFICULTY.easy);
                    should.equal(question.category, CATEGORY.array);
                    done();
                });
        });

        it("Should return that the MEDIUM question is SUCCESSFULLY received", function (done) {
            chai.request(app)
                .get(`/question/${DIFFICULTY.medium}`)
                .query({ category: CATEGORY.trees })
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.type.should.equal("application/json");
                    question = res.body.questions[0];
                    should.equal(res.body.questions.length, 1);
                    should.exist(question);
                    should.equal(question.difficulty, DIFFICULTY.medium);
                    should.equal(question.category, CATEGORY.trees);
                    done();
                });
        });

        it("Should return that the HARD question is SUCCESSFULLY received", function (done) {
            chai.request(app)
                .get(`/question/${DIFFICULTY.hard}`)
                .query({ category: CATEGORY.dp })
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.type.should.equal("application/json");
                    question = res.body.questions[0];
                    should.equal(res.body.questions.length, 1);
                    should.exist(question);
                    should.equal(question.difficulty, DIFFICULTY.hard);
                    should.equal(question.category, CATEGORY.dp);
                    done();
                });
        });
    });

    describe("Get Category", function () {
        it("Should return that the EASY question CATEGORY is SUCCESSFULLY received", function (done) {
            chai.request(app)
                .get(`/question/category/${DIFFICULTY.easy}`)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.type.should.equal("application/json");
                    categories = res.body.categories;
                    should.exist(categories);
                    should.exist(categories[0].category);
                    done();
                });
        });

        it("Should return that the MEDIUM question CATEGORY is SUCCESSFULLY received", function (done) {
            chai.request(app)
                .get(`/question/category/${DIFFICULTY.medium}`)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.type.should.equal("application/json");
                    categories = res.body.categories;
                    should.exist(categories);
                    should.exist(categories[0].category);
                    done();
                });
        });

        it("Should return that the HARD question CATEGORY is SUCCESSFULLY received", function (done) {
            chai.request(app)
                .get(`/question/category/${DIFFICULTY.hard}`)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.type.should.equal("application/json");
                    categories = res.body.categories;
                    should.exist(categories);
                    should.exist(categories[0].category);
                    done();
                });
        });
    });

    describe("Create Question", function () {
        it("Should return that the question is created successfully", function (done) {
            chai.request(app)
                .post("/question/add")
                .send({
                    difficulty: DIFFICULTY.easy,
                    category: CATEGORY.array,
                    question: "Test question",
                    externallink: "",
                })
                .end((err, res) => {
                    res.status.should.equal(201);
                    res.type.should.equal("application/json");
                    res.body.should.equal("Question created");
                    done();
                });
        });

        it("Should return that the question creation fails", function (done) {
            chai.request(app)
                .post("/question/add")
                .send({
                    difficulty: DIFFICULTY.easy,
                    category: CATEGORY.array,
                    question: "",
                    externallink: "",
                })
                .end((err, res) => {
                    res.status.should.equal(400);
                    res.type.should.equal("application/json");
                    res.body.should.equal("One of required field is empty.");
                    done();
                });
        });
    });

    describe("Delete Question", function () {
        it("Should return that the question is successfully deleted", function (done) {
            id = 1;
            chai.request(app)
                .delete(`/question/delete/${id}`)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.type.should.equal("application/json");
                    res.body.should.equal(`Question #${id} deleted`);
                    done();
                });
        });

        it("Should return that the question fails to delete", function (done) {
            id = 100;
            chai.request(app)
                .delete(`/question/delete/${id}`)
                .end((err, res) => {
                    res.status.should.equal(400);
                    res.type.should.equal("application/json");
                    res.body.should.equal("Failed deletion, the id might be invalid.");
                    done();
                });
        });
    });

    describe("Update Question", function () {
        it("Should return that the question is updated", function (done) {
            id = 2;
            chai.request(app)
                .put(`/question/update/${id}`)
                .send({
                    difficulty: DIFFICULTY.easy,
                    category: CATEGORY.array,
                    question: "Edited question",
                    externallink: "",
                })
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.type.should.equal("application/json");
                    res.body.should.equal(`Question #${id} updated`);
                    done();
                });
        });

        it("Should return that the question fails to update", function (done) {
            id = 100;
            chai.request(app)
                .put(`/question/update/${id}`)
                .send({
                    difficulty: DIFFICULTY.easy,
                    category: CATEGORY.array,
                    question: "Edited question",
                    externallink: "",
                })
                .end((err, res) => {
                    res.status.should.equal(400);
                    res.type.should.equal("application/json");
                    res.body.should.equal("Error updating the question. The id might not exist.");
                    done();
                });
        });
    });
});
