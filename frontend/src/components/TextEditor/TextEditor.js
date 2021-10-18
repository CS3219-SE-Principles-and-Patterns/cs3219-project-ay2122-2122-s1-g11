import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import io from 'socket.io-client';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

import ChatRoom from '../Chatbox/Chatbox';

const socket = io.connect('http://a2fc3bf466b15441abc7dae0fddc570a-1603244640.ap-southeast-1.elb.amazonaws.com:5000');

const TextEditor = () => {

    const [roomNo, setRoomNo] = useState(); 
    const [submitted, setSubmitted] = useState(false);
    const [text, setText] = useState('const cs3219 = () => {};');

    useEffect(() => {
        console.log(socket);
    }, []);

    useEffect(() => {
        socket.on('message', ({ editorText }) => {
            setText(editorText);
        });
    }, [socket]);

    const textChange = (editorText) => {
        socket.emit('keyup', { roomNo, editorText });
        setText(editorText);
    };

    const onSubmitRoomNo = () => {
        if (roomNo) {
            setRoomNo(roomNo);
            setSubmitted(true);
            socket.emit('join', roomNo);
            setText(`// You are connected to room ${roomNo}\n` + text);
        } else {
            alert('Your room number is empty.');
        }
    };
    
    return (
        <>
        {!submitted && <div>
            Please input the room number for connection: &nbsp;
            <input 
                type='text'
                onChange={(e) => setRoomNo(e.target.value)}
                value={roomNo} />
            <button onClick={onSubmitRoomNo}>Enter</button>
        </div>}

        {roomNo && submitted && <AceEditor // only populate editor when the room number is entered
            mode="javascript"
            theme="monokai"
            name="codeEditor"
            onChange={textChange}
            style={{ width: '100%', fontSize: 14 }}
            value={text} /> }

        {roomNo && submitted && <ChatRoom 
            socket={socket}
            roomNo={roomNo} />}
        </>
    )
};

export default TextEditor;