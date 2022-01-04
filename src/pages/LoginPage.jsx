import React, { useState, useEffect } from "react"
import Button from "../components/Button"
import Container from "../components/Container"
import Input from "../components/Input"
import { useNavigate, useLocation } from "react-router-dom"

import { BASE_URL } from "../utils"
import Label from "../components/Label"
import Paragraph from "../components/Paragraph"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const uid = params.get("uid")
        const token = params.get("token")

        if (uid && token) {
            const url = `${BASE_URL}/auth/users/activate/`
            const headers = {
                "Content-Type": "application/json"
            }
            const payload = {
                uid,
                token
            }

            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(payload)
            })
                .then(res => navigate("/login"))
        }
    }, [navigate, location])

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const url = `${BASE_URL}/api-token-auth/`
        const headers = { "Content-Type": "application/json" }
        const payload = { email, password }

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    setMessage("Felaktigt användarnamn eller lösenord")
                    throw new Error("Incorrect username or password")
                }
            })
            .then(data => {
                const token = data.token
                localStorage.removeItem("matte-js3")
                localStorage.setItem("matte-js3", token)
                navigate("/home")
            })
            .catch(err => console.log(err))
    }

    return (
        <Container col width={30}>
            <h1>Login</h1>
            {message && <Paragraph error>{message}</Paragraph>}
            <form onSubmit={handleOnSubmit}>
                <Container>
                    <Container col width={30} justify="space-between">
                        <Label htmlFor="email">Email</Label>
                        <Label htmlFor="password">Lösenord</Label>
                    </Container>
                    <Container col width={70} justify="space-between">
                        <Input type="text" id="email" value={email} setValue={setEmail} placeholder="Email" />
                        <Input type="password" id="password" value={password} setValue={setPassword} placeholder="Password" />
                    </Container>
                </Container>
                <Button type="submit">Login</Button>
            </form>

        </Container >
    )
}
