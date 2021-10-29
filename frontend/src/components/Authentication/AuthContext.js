import React, { useEffect, useState } from 'react'

export const AuthContext = React.createContext()

export default function AuthProvider({ children }) {
    
    
    return (
        <AuthContext.Provider value={localStorage.getItem('token')}>
            { children }
        </AuthContext.Provider>
    )
}
