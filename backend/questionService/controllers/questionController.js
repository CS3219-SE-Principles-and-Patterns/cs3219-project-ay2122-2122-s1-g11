// REQUIRE MODEL
const { NO_CATEGORY_MSG, NO_RESULT_MSG } = require("../models/ERRORMSG.js");
const Questions = require("../models/question.js");

module.exports = {
    // CHECK APPLICATION
    getStatus(req, res, next) {
        res.status(200).json("Question service is running succsesfully");
    },

    // GET RANDOM EASY QUESTION
    getEasyQuestion(req, res, next) {
        category = req.query.category;
        if (!category) {
            return res.status(400).json(NO_CATEGORY_MSG);
        }
        Questions.getRandomEasy(category)
            .then((data) => {
                if (data.length === 0) {
                    return res.status(400).json(NO_RESULT_MSG);
                }
                return res.status(200).json({ questions: data });
            })
            .catch((err) => res.status(400).json(err));
    },

    // GET RANDOM MEDIUM QUESTION
    getMediumQuestion(req, res, next) {
        category = req.query.category;
        if (!category) {
            return res.status(400).json(NO_CATEGORY_MSG);
        }
        Questions.getRandomMedium(category)
            .then((data) => {
                if (data.length === 0) {
                    return res.status(400).json(NO_RESULT_MSG);
                }
                return res.status(200).json({ questions: data });
            })
            .catch((err) => res.status(400).json(err));
    },

    // GET RANDOM HARD QUESTION
    getHardQuestion(req, res, next) {
        category = req.query.category;
        if (!category) {
            return res.status(400).json(NO_CATEGORY_MSG);
        }
        Questions.getRandomHard(category)
            .then((data) => {
                if (data.length === 0) {
                    return res.status(400).json(NO_RESULT_MSG);
                }
                return res.status(200).json({ questions: data });
            })
            .catch((err) => res.status(400).json(err));
    },

    // GET EASY CATEGORY
    getEasyCategory(req, res, next) {
        Questions.getEasyCategory()
            .then((data) => res.status(200).json({ categories: data }))
            .catch((err) => res.status(400).json(err));
    },

    // GET MEDIUM CATEGORY
    getMediumCategory(req, res, next) {
        Questions.getMediumCategory()
            .then((data) => res.status(200).json({ categories: data }))
            .catch((err) => res.status(400).json(err));
    },

    // GET HARD CATEGORY
    getHardCategory(req, res, next) {
        Questions.getHardCategory()
            .then((data) => res.status(200).json({ categories: data }))
            .catch((err) => res.status(400).json(err));
    },

    // CREATE QUESTION
    createQuestion(req, res, next) {
        // USE BODY PARSER TO EXTRACT DATA FROM CLIENT
        const { difficulty, category, question, link } = req.body;

        if (!difficulty || !category || !question) {
            res.status(400).json("One of required field is empty.");
            return;
        }

        Questions.create(difficulty, category, question, link)
            .then(() => {
                res.status(201).json("Question created");
            })
            .catch((err) => res.status(400).json(err));
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
                    res.status(200).json(`Question #${id} updated`);
                }
            })
            .catch((err) => res.status(400).json(err));
    },

    // DELETE QUESTION
    deleteQuestion(req, res, next) {
        let id = req.params.id;

        Questions.delete(id)
            .then((response) => {
                if (response === 1) {
                    res.status(200).json(`Question #${id} deleted`);
                } else {
                    res.status(400).json("Failed deletion, the id might be invalid.");
                }
            })
            .catch((err) => res.status(400).json(err));
    },
};
