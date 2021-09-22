const database = require("../services/database");

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const Question = {};

// CREATE QUESTION
Question.create = (proficiency, category) => {
    return database("questions")
        .insert({
            proficiency: proficiency,
            category: category,
        })
        .returning("*");
};

// GET ALL QUESTIONS
Question.get = () => {
    return database.select("*").from("questions");
};

// UPDATE AN ARTICLE
Question.update = (proficiency, category, id) => {
    return database("questions").where("id", id).returning("*").update({
        proficiency: proficiency,
        category: category,
    });
};

// DELETE AN ARTICLE
Question.delete = (id) => {
    return database("questions").where("id", id).del();
};

module.exports = Question;
