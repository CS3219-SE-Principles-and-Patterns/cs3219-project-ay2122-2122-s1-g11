const database = require("../services/database");

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const Question = {};

// CREATE QUESTION
Question.create = (difficulty, category, question, link) => {
    return database("questions")
        .insert({
            difficulty: difficulty,
            category: category,
            question: question,
            externallink: link,
        })
        .returning("*");
};

// GET ALL QUESTIONS
Question.get = () => {
    return database.select("*").from("questions");
};

// GET ALL EASY QUESTIONS
Question.getRandomEasy = () => {
    return database
        .select("*")
        .from("questions")
        .where("difficulty", "easy")
        .orderByRaw("RANDOM()")
        .limit(1);
};

// GET ALL DISTINCT EASY QUESTION'S CATEGORY
Question.getEasyCategory = () => {
    return database
        .select("category")
        .from("questions")
        .where("difficulty", "easy")
        .groupBy("category");
};

// GET ALL MEDIUM QUESTIONS
Question.getRandomMedium = () => {
    return database
        .select("*")
        .from("questions")
        .where("difficulty", "medium")
        .orderByRaw("RANDOM()")
        .limit(1);
};

// GET ALL DISTINCT MEDIUM QUESTION'S CATEGORY
Question.getMediumCategory = () => {
    return database
        .select("category")
        .from("questions")
        .where("difficulty", "medium")
        .groupBy("category");
};

// GET ALL HARD QUESTIONS
Question.getRandomHard = () => {
    return database
        .select("*")
        .from("questions")
        .where("difficulty", "hard")
        .orderByRaw("RANDOM()")
        .limit(1);
};

// GET ALL DISTINCT HARD QUESTION'S CATEGORY
Question.getHardCategory = () => {
    return database
        .select("category")
        .from("questions")
        .where("difficulty", "hard")
        .groupBy("category");
};

// UPDATE AN ARTICLE
Question.update = (difficulty, category, question, link, id) => {
    return database("questions").where("id", id).returning("*").update({
        difficulty: difficulty,
        category: category,
        question: question,
        externallink: link,
    });
};

// DELETE AN ARTICLE
Question.delete = (id) => {
    return database("questions").where("id", id).del();
};

module.exports = Question;
