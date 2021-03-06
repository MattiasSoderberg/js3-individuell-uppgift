import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem("matte-js3")
    return (
        <>
            {token ? <>
                {children}
            </> : <Navigate to="/" />}
        </>
    )
}
