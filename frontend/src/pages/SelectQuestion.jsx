import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getCategoriesAPI, getRandomQuestionAPI } from "../api/questionService";
import ErrorAlert from "../components/Others/ErrorAlert";
import SelectCategory from "../components/QuestionSelection/SelectCategory";
import SelectDifficulty from "../components/QuestionSelection/SelectDifficulty";
import LoadingScreen from "../components/QuestionSelection/LoadingScreen";
import axios from "axios";
import ErrorMsgs from "../constants/ErrorMsgs";

class SelectQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            difficultySelected: "",
            categories: [],
            categorySelected: "",
            loadingState: false,
            userId: null, // update userId to be Id from database
            intervalId: null,
            errorMsg: "",
            errorMsgDisplay: "none",
        };
    }

    componentDidMount() {
        // clear zombie state
        try {
            axios.post("http://localhost:8000/match/deleteZombie", {user: localStorage.getItem('id')},
            {
              headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
              }
            });
        } catch (e) {
            console.log(e);
        }
        
    }

    componentWillUnmount() {
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
            this.setState({ intervalId: null });
        }
    }

    onDifficultySelect = (event) => {
        const difficulty = event.target.innerText.toLowerCase();
        this.getCategories(difficulty);
        this.setState({ difficultySelected: difficulty });
    };

    onCategorySelect = async (event) => {
        const category = event.target.innerText.toLowerCase();
        // this.getRandomQuestion(category);
        this.setState({ categorySelected: category }, () => {
            this.setState({ loadingState: true });
            this.createMatch();
        });
    };

    getCategories = async (difficulty) => {
        try {
            const result = await getCategoriesAPI(difficulty);

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

    loadingScreenHandleClose = () => {
        this.setState({ loadingState: false });
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
            this.setState({ intervalId: null });
        }
        if (this.state.userId && this.state.difficultySelected && this.state.categorySelected) {
            const data = {
                user: this.state.userId,
                difficulty: this.state.difficultySelected,
                category: this.state.categorySelected,
            };
            axios.post("http://localhost:8000/match/delete", data,
            {
              headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
              }
            });
        }
    };

    createMatch = async () => {
        const userId = localStorage.getItem('id');
        this.setState({ userId });
        const data = {
            user: userId,
            difficulty: this.state.difficultySelected,
            category: this.state.categorySelected,
        };
        const response = await axios.post("http://localhost:8000/match/create", 
            data,
            {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
        if (response.data.matchStatus === "success") {
            // get the random question
            // connect to code collab
            this.props.history.push("/room");
        } else if (response.data.matchStatus === "waiting") {
            const interval = setInterval(() => this.findMatch(userId), 5000);
            this.setState({ intervalId: interval });
        }
    };

    // find match is called every 5 seconds to check if the user is matched
    findMatch = async (userId) => {
        const response = await axios.post("http://localhost:8000/match", {
            user: userId,
            difficulty: this.state.difficultySelected,
            category: this.state.categorySelected,
        },
        {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token')
          }
        });
        console.log("findMatch response: ", response.data);
        if (response.data.matchStatus == "failed") {
            console.log('failed acivated')
            this.setState({ loadingState: false });
            clearInterval(this.state.intervalId);
        } else if (response.data.matchStatus == "success") {
            clearInterval(this.state.intervalId);
            this.setState({ intervalId: null });
            this.props.history.push("/room");
            // get the random question
            // connect to code collab
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

        // if (difficultySelected && categorySelected) {
        //     this.props.history.push("/room");
        //     this.setState({ difficultySelected: "", categorySelected: "" });
        // }

        return (
            <React.Fragment>
                <ErrorAlert msg={errorMsg} display={errorMsgDisplay} />
                <div>{SelectType}</div>
                {this.state.loadingState && (
                    <LoadingScreen
                        handleClose={() => this.loadingScreenHandleClose()}
                        open={this.state.loadingState}
                        difficulty={this.state.difficultySelected}
                        category={this.state.categorySelected}
                    />
                )}
            </React.Fragment>
        );
    }
}

export default withRouter(SelectQuestion);
