// REQUIRE MODEL
const Questions = require("../models/question.js");

module.exports = {
    // GET ALL QUESTIONS
    getAllQuestions(req, res, next) {
        Questions.get()
            .then((data) => res.status(200).json({ success: true, questions: data }))
            .catch((err) => res.status(400).json({ err }));
    },

    // GET RANDOM QUESTION
    getRandomQuestion(req, res, next) {
        // TODO
        Questions.get()
            .then((data) => res.status(200).json({ success: true, questions: data }))
            .catch((err) => res.status(400).json({ err }));
    },

    // CREATE QUESTION
    createQuestion(req, res, next) {
        // USE BODY PARSER TO EXTRACT DATA FROM CLIENT
        const { proficiency, category } = req.body;

        Questions.create(proficiency, category)
            .then(() => res.status(201).json({ success: true, msg: "Question created" }))
            .catch((err) => res.status(400).json({ err }));
    },

    // UPDATE QUESTION
    updateQuestion(req, res, next) {
        // USE BODY PARSER TO EXTRACT DATA FROM CLIENT
        const { proficiency, category } = req.body;
        // ID OF QUESTION TO UPDATE
        let id = req.params.id;

        Questions.update(proficiency, category, id)
            .then(() => res.status(200).json({ success: true, msg: `Question #${id} updated` }))
            .catch((err) => res.status(400).json({ err }));
    },

    // DELETE QUESTION
    deleteQuestion(req, res, next) {
        let id = req.params.id;

        Questions.delete(id)
            .then(() => res.status(200).json({ success: true, msg: `Question #${id} deleted` }))
            .catch((err) => res.status(400).json({ err }));
    },
};
