const express = require("express");
const router = express.Router();
const QuestionsController = require("../controllers/questionController");

/**
 * GET request to /questions
 */
// router.get("/", QuestionsController.getAllQuestions);

/**
 * GET request to /questions/random
 */
router.get("/", QuestionsController.getAllQuestions);
router.get("/random", QuestionsController.getRandomQuestion);
router.post("/add", QuestionsController.createQuestion);
router.put("/update/:id", QuestionsController.createQuestion);
router.delete("/delete/:id", QuestionsController.deleteQuestion);

/**
 * GET request to /authors/:id
 */
// router.get('/:id', (req, res, next) => {
//     res.status(200).json({
//         message: 'Author with id was fetch'
//     });
// });

module.exports = router;
