import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SelectCategory from "../components/QuestionSelection/SelectCategory";
import SelectDifficulty from "../components/QuestionSelection/SelectDifficulty";

class SelectQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            difficultySelected: "",
            categorySelected: "",
        };
    }

    onDifficultySelect = (event) => {
        // window.localStorage.setItem("difficultySelected", "difficulty");
        const value = event.target.innerText.toLowerCase();
        this.setState({ difficultySelected: value });
    };

    onCategorySelect = (event) => {
        // window.localStorage.setItem("categorySelect", "category");
        const value = event.target.innerText.toLowerCase();
        this.setState({ categorySelected: value });
    };

    render() {
        const { difficultySelected, categorySelected } = this.state;

        const SelectType = difficultySelected ? (
            <SelectCategory onSelect={this.onCategorySelect} />
        ) : (
            <SelectDifficulty onSelect={this.onDifficultySelect} />
        );

        if (difficultySelected && categorySelected) {
            this.props.history.push("/room");
            this.setState({ difficultySelected: "", categorySelected: "" });
        }

        return (
            <div>
                <h2>Please select the difficulty of your questions</h2>
                {SelectType}
            </div>
        );
    }
}

export default withRouter(SelectQuestion);
