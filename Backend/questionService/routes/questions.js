const express = require("express");
const router = express.Router();
const QuestionsController = require("../controllers/questionController");

// Routes with questions/...
router.get("/", QuestionsController.getStatus);
router.get("/easy", QuestionsController.getEasyQuestion);
router.get("/medium", QuestionsController.getMediumQuestion);
router.get("/hard", QuestionsController.getHardQuestion);
router.get("/easy/category", QuestionsController.getEasyCategory);
router.get("/medium/category", QuestionsController.getMediumCategory);
router.get("/hard/category", QuestionsController.getHardCategory);
router.post("/add", QuestionsController.createQuestion);
router.put("/update/:id", QuestionsController.updateQuestion);
router.delete("/delete/:id", QuestionsController.deleteQuestion);

module.exports = router;
