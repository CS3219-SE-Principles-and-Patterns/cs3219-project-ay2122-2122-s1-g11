// REQUIRE MODEL
const Questions = require("../models/question.js");

module.exports = {
    // CHECK APPLICATION
    getStatus(req, res, next) {
        res.status(200).json("Question service is running succsesfully");
    },

    // GET RANDOM EASY QUESTION
    getEasyQuestion(req, res, next) {
        Questions.getRandomEasy()
            .then((data) => res.status(200).json({ success: true, questions: data }))
            .catch((err) => res.status(400).json({ err }));
    },

    // GET RANDOM MEDIUM QUESTION
    getMediumQuestion(req, res, next) {
        Questions.getRandomMedium()
            .then((data) => res.status(200).json({ success: true, questions: data }))
            .catch((err) => res.status(400).json({ err }));
    },

    // GET RANDOM HARD QUESTION
    getHardQuestion(req, res, next) {
        Questions.getRandomHard()
            .then((data) => res.status(200).json({ success: true, questions: data }))
            .catch((err) => res.status(400).json({ err }));
    },

    // GET EASY CATEGORY
    getEasyCategory(req, res, next) {
        Questions.getEasyCategory()
            .then((data) => res.status(200).json({ success: true, categories: data }))
            .catch((err) => res.status(400).json({ err }));
    },

    // GET MEDIUM CATEGORY
    getMediumCategory(req, res, next) {
        Questions.getMediumCategory()
            .then((data) => res.status(200).json({ success: true, categories: data }))
            .catch((err) => res.status(400).json({ err }));
    },

    // GET HARD CATEGORY
    getHardCategory(req, res, next) {
        Questions.getHardCategory()
            .then((data) => res.status(200).json({ success: true, categories: data }))
            .catch((err) => res.status(400).json({ err }));
    },

    // CREATE QUESTION
    createQuestion(req, res, next) {
        // USE BODY PARSER TO EXTRACT DATA FROM CLIENT
        const { difficulty, category, question, link } = req.body;

        Questions.create(difficulty, category, question, link)
            .then(() => res.status(201).json({ success: true, msg: "Question created" }))
            .catch((err) => res.status(400).json({ err }));
    },

    // UPDATE QUESTION
    updateQuestion(req, res, next) {
        // USE BODY PARSER TO EXTRACT DATA FROM CLIENT
        const { difficulty, category, question, link } = req.body;
        // ID OF QUESTION TO UPDATE
        let id = req.params.id;

        Questions.update(difficulty, category, question, link, id)
            .then((response) => {
                if (!response || response.length === 0) {
                    res.status(400).json("Error updating the question. The id might not exist.");
                } else {
                    res.status(200).json({ success: true, msg: `Question #${id} updated` });
                }
            })
            .catch((err) => res.status(400).json({ err }));
    },

    // DELETE QUESTION
    deleteQuestion(req, res, next) {
        let id = req.params.id;

        Questions.delete(id)
            .then((response) => {
                if (response === 1) {
                    res.status(200).json({ success: true, msg: `Question #${id} deleted` });
                } else {
                    res.status(400).json({
                        success: false,
                        msg: "Failed deletion, the id might be invalid.",
                    });
                }
            })
            .catch((err) => res.status(400).json({ err }));
    },
};
