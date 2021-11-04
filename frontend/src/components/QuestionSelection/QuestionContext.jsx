import React, { useState } from 'react'

export const QuestionContext = React.createContext()

export default function QuestionProvider({ children }) {
    
    const [question, setQuestion] = useState("");
    return (
        <QuestionContext.Provider value={{ question, setQuestion }}>
            { children }
        </QuestionContext.Provider>
    )
}
