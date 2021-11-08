import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { endpoints } from "../../api/endpoints";

const socket = io.connect(endpoints.socketIO);

const Chatbox = ({ roomNo, user }) => {
    const [introMsg, setIntroMsg] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatBoxText, setChatBoxText] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToView = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        socket.emit("join", { roomNo, user });
        socket.on("chat_new_message", ({ message }) => {
            setChatMessages((prevMessages) => [
                ...prevMessages,
                {
                    type: "receive",
                    text: message,
                },
            ]);
        });
        socket.on("chat_join", ({ message }) => {
            setChatMessages((prevMessages) => [
                ...prevMessages,
                {
                    type: "join",
                    text: message,
                },
            ]);
        });
        socket.on("user_dc", ({ message }) => {
            setChatMessages((prevMessages) => [
                ...prevMessages,
                {
                    type: "dc",
                    text: message,
                },
            ]);
        });
    }, [socket]);

    useEffect(() => {
        if (chatMessages.length > 0) scrollToView();
    }, [chatMessages]);

    const onMessageSend = () => {
        socket.emit("chat_send_message", { roomNo, message: chatBoxText });
        setChatMessages([
            ...chatMessages,
            {
                type: "send",
                text: chatBoxText,
            },
        ]);
        setChatBoxText("");
    };

    const onInputKeydown = (e) => {
        if (e.key === "Enter") onMessageSend();
    };

    return (
        <div style={{ width: "100%" }}>
            {/* main wrapper div */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}
            >
                {/* chat box area */}
                <div
                    style={{
                        display: "flex",
                        flex: 60,
                        flexDirection: "column",
                        overflow: "auto",
                        backgroundColor: "#F7F7F7",
                    }}
                >
                    {chatMessages.map((message) => {
                        if (message.type === "send") {
                            return (
                                <div
                                    style={{
                                        backgroundColor: "#d3f3f5",
                                        padding: "10px",
                                        borderRadius: "10px",
                                        display: "flex",
                                        alignSelf: "flex-start",
                                        marginBottom: "5px",
                                    }}
                                >
                                    {message.text}
                                </div>
                            );
                        } else if (message.type === "receive") {
                            return (
                                <div
                                    style={{
                                        backgroundColor: "#ddf5d3",
                                        padding: "10px",
                                        borderRadius: "10px",
                                        display: "flex",
                                        alignSelf: "flex-end",
                                        marginBottom: "5px",
                                    }}
                                >
                                    {message.text}
                                </div>
                            );
                        } else if (message.type === "join" || message.type === "dc") {
                            return (
                                <div
                                    style={{
                                        backgroundColor: "#e3e3e3",
                                        padding: "10px",
                                        borderRadius: "10px",
                                        display: "flex",
                                        alignSelf: "center",
                                        marginBottom: "5px",
                                    }}
                                >
                                    {message.text}
                                </div>
                            );
                        }
                    })}
                    <div ref={messagesEndRef}></div>
                </div>
                {/* input area */}
                <div
                    style={{
                        display: "flex",
                        flex: 1,
                    }}
                >
                    <input
                        type="text"
                        placeholder="Enter your chat text here"
                        onChange={(e) => setChatBoxText(e.target.value)}
                        onKeyDown={onInputKeydown}
                        value={chatBoxText}
                        style={{ width: "80%", padding: "5px 10px" }}
                    />
                    <button onClick={onMessageSend}>Enter</button>
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
