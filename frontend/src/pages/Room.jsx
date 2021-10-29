import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Chatbox from "../components/Chatbox/Chatbox";
import CollabEditor from "../components/CollabEditor/CollabEditor";

const Room = () => {

    const location = useLocation();
    const getRoomId = () => {
        return new URLSearchParams(location.search).get('id');
    }
    {/* temporary function for testing */}
    const getUserId = () => {
        return new URLSearchParams(location.search).get('user');
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            minHeight: '100vh',
            maxWidth: '100%'
        }}>
            { getRoomId() != null ? 
                <div style={{ display: 'flex', width: '100%' }}>
                    <div
                        style={{
                            fontSize: "15px",
                            overflowY: "auto",
                            textAlign: "left",
                            flex: 3,
                            height: '100%'
                        }}>
                            <CollabEditor 
                                id={getRoomId()}
                                user={getUserId()} />
                    </div>
                    <div
                        style={{
                            flex: 1,
                            height: '100%'
                        }}>
                            <Chatbox 
                                roomNo={getRoomId()} />
                    </div>
                </div>
            : <h2>You must be redirected by a room number!</h2>
            }
        </div>
    );
};

export default Room;
