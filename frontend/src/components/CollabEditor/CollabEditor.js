import React, { useEffect, useState } from 'react'
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { UnControlled as CodeMirrorEditor } from "react-codemirror2";
import { CodemirrorBinding } from "y-codemirror";
import RandomColor from "randomcolor";

import "./CollabEditor.css";
import "./EditorAddon";

// adapted from Mohd Athar's React yJS Tutorial
// https://atharmohammad.medium.com/tutorial-make-a-real-time-code-editor-in-react-using-yjs-code-n-collab-d843fad6661

const CollabEditor = ({ id, user, style }) => {
    const [EditorRef, setEditorRef] = useState(null);
    const [code, setCode] = useState("");
    const [lang, setLang] = useState("text/javascript");
    const [theme, setTheme] = useState("monokai");

    const handleEditorDidMount = (editor) => {
        setEditorRef(editor);
    };

    useEffect(() => {
        if (EditorRef) {
            const ydoc = new Y.Doc();

            let provider = null;
            try {
                provider = new WebrtcProvider(id, ydoc, { 
                    signaling: [
                        "wss://signaling.yjs.dev",
                        'wss://y-webrtc-signaling-eu.herokuapp.com',
                        'wss://y-webrtc-signaling-us.herokuapp.com'
                    ]
                });

                const yText = ydoc.getText("codemirror");
                const yUndoManager = new Y.UndoManager(yText);
                const awareness = provider.awareness;
                const color = RandomColor();

                awareness.setLocalStateField("user", {
                    name: user,
                    color: color,
                });

                const getBinding = new CodemirrorBinding(yText, EditorRef, awareness, {
                    yUndoManager,
                });

                // send welcome message
                EditorRef.setValue(`// Welcome to room ${id}! Happy coding :D`);

            } catch (err) {
                alert("There is an issue with code collaboration editor. Try again later!");
            }

            // useEffect clean-up return method
            return () => {
                if (provider) {
                    provider.disconnect(); // Upon disconnect, destroy the document
                    ydoc.destroy();  // Disable changes from propgating
                }
            };
        }
    }, [EditorRef]);
    
    const onLangChange = (e) => {
        setLang(e.target.value);
    };

    const onThemeChange = (e) => {
        setTheme(e.target.value);
    }

    return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>
                <div style={{ flex: 10 }}>
                <CodeMirrorEditor
                    onChange={(editor, data, value) => {
                        setCode(value);
                    }}
                    autoScroll
                    options={{
                        mode: lang,
                        theme: theme,
                        lineWrapping: true,
                        smartIndent: true,
                        lineNumbers: true,
                        foldGutter: true,
                        tabSize: 2,
                        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                        autoCloseTags: true,
                        matchBrackets: true,
                        autoCloseBrackets: true,
                        extraKeys: {
                            "Ctrl-Space": "autocomplete",
                        },
                    }}
                    editorDidMount={(editor) => {
                        handleEditorDidMount(editor);
                        editor.setSize("100vw", "100%");
                    }}
                />
                </div>
                <div style={{ padding: '10px' }}>
                    <select onChange={onLangChange} value={lang}>
                        <option value='text/x-c++src'>C++</option>
                        <option value='text/x-csharp'>C#</option>
                        <option value='text/x-java'>Java</option>
                        <option value='text/x-python'>Python</option>
                        <option value='text/javascript'>nodejs</option>
                    </select>
                    <select onChange={onThemeChange} value={theme}>
                        <option>dracula</option>
                        <option>monokai</option>
                        <option>ambiance</option>
                        <option>material-darker</option>
                        <option>material-palenight</option>
                        <option>mdn-like</option>
                        <option>eclipse</option>
                    </select>
                </div>
            </div>
    );
}

export default CollabEditor;