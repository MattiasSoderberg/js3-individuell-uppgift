import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Container from '../components/Container'

export default function LandingPage() {
    return (
        <Container col>
            <h1>Login</h1>
            <p>Logga in eller skapa ett konto.</p>
            <Container gap="3rem">
                <Link to="/login"><Button>Logga in</Button></Link>
                <Link to="/user/create"><Button color="#d487ac" hoverColor="#f71482">Skapa konto</Button></Link>
            </Container>
        </Container>
    )
}
