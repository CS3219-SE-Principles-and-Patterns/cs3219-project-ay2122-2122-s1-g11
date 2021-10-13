import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getCategoiesAPI, getRandomQuestionAPI } from "../api/questionService";
import ErrorAlert from "../components/Others/ErrorAlert";
import SelectCategory from "../components/QuestionSelection/SelectCategory";
import SelectDifficulty from "../components/QuestionSelection/SelectDifficulty";
import ErrorMsgs from "../constants/ErrorMsgs";

class SelectQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            difficultySelected: "",
            categories: [],
            categorySelected: "",
            errorMsg: "",
            errorMsgDisplay: "none",
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
        try {
            const result = await getCategoiesAPI(difficulty);

            if (result.status === 200 && result.data.categories.length > 0) {
                const categories = result.data.categories;
                this.setState({ categories: categories });
            } else {
                this.setState({ errorMsg: ErrorMsgs.noCategoryAPI, errorMsgDisplay: "" });
            }
        } catch (exception) {
            this.setState({ errorMsg: ErrorMsgs.noCategoryAPI, errorMsgDisplay: "" });
        }
    };

    getRandomQuestion = async (category) => {
        const result = await getRandomQuestionAPI(this.state.difficultySelected, category);
        if (result.status === 200) {
            const question = result.data.questions[0];
            console.log(question);
        } else {
            this.setState({ errorMsg: ErrorMsgs.noQuestionAPI, errorMsgDisplay: "" });
        }
    };

    render() {
        const { difficultySelected, categories, categorySelected, errorMsg, errorMsgDisplay } =
            this.state;

        const SelectType = difficultySelected ? (
            <SelectCategory onSelect={this.onCategorySelect} categories={categories} />
        ) : (
            <SelectDifficulty onSelect={this.onDifficultySelect} />
        );

        if (difficultySelected && categorySelected) {
            this.props.history.push("/room");
            this.setState({ difficultySelected: "", categorySelected: "" });
        }

        return (
            <div>
                <ErrorAlert msg={errorMsg} display={errorMsgDisplay} />
                {SelectType}
            </div>
        );
    }
}

export default withRouter(SelectQuestion);
