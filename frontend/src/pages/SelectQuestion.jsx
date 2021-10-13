import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getCategoiesAPI, getRandomQuestionAPI } from "../api/questionService";
import SelectCategory from "../components/QuestionSelection/SelectCategory";
import SelectDifficulty from "../components/QuestionSelection/SelectDifficulty";

class SelectQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            difficultySelected: "",
            categories: [],
            categorySelected: "",
        };
    }

    onDifficultySelect = (event) => {
        const difficulty = event.target.innerText.toLowerCase();
        this.getCategories(difficulty);
        this.setState({ difficultySelected: difficulty });
    };

    onCategorySelect = async (event) => {
        const category = event.target.innerText.toLowerCase();
        this.getRandomQuestion(category);
        this.setState({ categorySelected: category });
    };

    getCategories = async (difficulty) => {
        const result = await getCategoiesAPI(difficulty);
        if (result.status === 200) {
            const categories = result.data.categories;
            this.setState({ categories: categories });
        } else {
            // TODO: Change to alert message in the future
            window.alert("Error connecting to the API");
        }
    };

    getRandomQuestion = async (category) => {
        const result = await getRandomQuestionAPI(this.state.difficultySelected, category);
        if (result.status === 200) {
            const question = result.data.questions[0];
            console.log(question);
        } else {
            // TODO: Change to alert message in the future
            window.alert("Error connecting to the API");
        }
    };

    render() {
        const { difficultySelected, categories, categorySelected } = this.state;

        const SelectType = difficultySelected ? (
            <SelectCategory onSelect={this.onCategorySelect} categories={categories} />
        ) : (
            <SelectDifficulty onSelect={this.onDifficultySelect} />
        );

        if (difficultySelected && categorySelected) {
            this.props.history.push("/room");
            this.setState({ difficultySelected: "", categorySelected: "" });
        }

        return <div>{SelectType}</div>;
    }
}

export default withRouter(SelectQuestion);
