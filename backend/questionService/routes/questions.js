const express = require("express");
const router = express.Router();
const QuestionsController = require("../controllers/questionController");

// Routes with questions/...
router.get("/", QuestionsController.getStatus);
router.get("/easy", QuestionsController.getEasyQuestion);
router.get("/medium", QuestionsController.getMediumQuestion);
router.get("/hard", QuestionsController.getHardQuestion);
router.get("/category/easy", QuestionsController.getEasyCategory);
router.get("/category/medium", QuestionsController.getMediumCategory);
router.get("/category/hard", QuestionsController.getHardCategory);
router.post("/add", QuestionsController.createQuestion);
router.put("/update/:id", QuestionsController.updateQuestion);
router.delete("/delete/:id", QuestionsController.deleteQuestion);

module.exports = router;
