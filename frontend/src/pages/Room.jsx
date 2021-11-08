import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Chatbox from "../components/Chatbox/Chatbox";
import CollabEditor from "../components/CollabEditor/CollabEditor";
import { QuestionContext } from "../components/QuestionSelection/QuestionContext";

const Room = () => {
    const { question, setQuestion } = useContext(QuestionContext);
    const location = useLocation();
    const getRoomId = () => {
        return new URLSearchParams(location.search).get("id");
    };
    {
        /* temporary function for testing */
    }
    const getUserId = () => {
        return new URLSearchParams(location.search).get("user");
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "94vh",
            }}
        >
            <div
                style={{
                    display: "flex",
                    paddingLeft: 10,
                }}
            >
                <h2>{question}</h2>
            </div>
            <div
                style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "row",
                    minHeight: 0,
                }}
            >
                {getRoomId() != null ? (
                    <>
                        <div
                            style={{
                                fontSize: "15px",
                                textAlign: "left",
                                display: "flex",
                                flex: 3,
                            }}
                        >
                            <CollabEditor id={getRoomId()} user={getUserId()} />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flex: 1,
                            }}
                        >
                            <Chatbox roomNo={getRoomId()} />
                        </div>
                    </>
                ) : (
                    <h2>You must be redirected by a room number!</h2>
                )}
            </div>
        </div>
    );
};

export default Room;
