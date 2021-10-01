import React, { useState, useEffect } from 'react';

const Chatbox = ({ socket, roomNo }) => {

    const [chatMessages, setChatMessages] = useState([]);
    const [chatBoxText, setChatBoxText] = useState('');

    useEffect(() => {
        socket.on('chat_new_message', ({ message }) => {
            setChatMessages(prevMessages => [
                ...prevMessages,
                {
                    type: 'receive',
                    text: message
                }
            ]);
        });
    }, [socket]);
    
    const onMessageSend = () => {
        socket.emit('chat_send_message', { roomNo, message: chatBoxText });
        setChatMessages([
            ...chatMessages,
            {
                type: 'send',
                text: chatBoxText
            }
        ]);
        setChatBoxText('');
    };

    const onInputKeydown = (e) => {
        if (e.key === 'Enter') onMessageSend();
    }

    return (
        <>
            <h1>Chat Room</h1>
            <div style={{ display: 'flex', flexDirection: 'column', height: '300px', overflow: 'auto', backgroundColor: '#F7F7F7' }}>
                {
                    chatMessages.map(message => {
                        if (message.type === 'send') {
                            return (<div style={{ backgroundColor: '#d3f3f5', padding: '10px', borderRadius: '10px', display: 'flex', alignSelf: 'flex-start', marginBottom: '5px' }}>
                                    { message.text }
                                </div>)
                        } else if (message.type === 'receive') {
                            return (<div style={{ backgroundColor: '#ddf5d3', padding: '10px', borderRadius: '10px', display: 'flex', alignSelf: 'flex-end', marginBottom: '5px' }}>
                                    { message.text }
                                </div>)
                        }
                    })
                }
            </div>
            <input 
                type="text" 
                placeholder="Enter your chat text here" 
                onChange={(e) => setChatBoxText(e.target.value)}
                onKeyDown={onInputKeydown}
                value={chatBoxText}
                style={{ width: '80%', padding: '5px 10px' }}/>
            <button onClick={onMessageSend}>Enter</button>
        </>
    );
};

export default Chatbox;