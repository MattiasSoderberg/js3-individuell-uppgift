import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'
import Button from '../components/Button'
import Container from '../components/Container'
import StyledLink from '../components/StyledLink'
import { BASE_URL } from '../utils'

export default function HomePage() {
    const { customerList, setCustomerList, setUser } = useContext(UserContext)

    useEffect(() => {
        const url = `${BASE_URL}/api/v1/me/`
        const token = localStorage.getItem("matte-js3")
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }

        fetch(url, {
            method: "GET",
            headers: headers
        })
            .then(res => res.json())
            .then(data => setUser(data))
    }, [setUser])

    useEffect(() => {
        const url = `${BASE_URL}/api/v1/customers`
        const token = localStorage.getItem("matte-js3")
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        fetch(url, {
            method: "GET",
            headers: headers
        })
            .then(res => res.json())
            .then(data => setCustomerList(data.results))
    }, [setCustomerList])

    return (
        <Container col>
            <h1>Hemskärm</h1>
            {customerList && customerList.length !== 0 ?
                customerList.map(customer => {
                    return <StyledLink to={`/customer/${customer.id}`} key={customer.id}>{customer.name}</StyledLink>
                })
                : <p>Kundlistan är tom</p>
            }
            <Container>
                <Link to="/customer/create"><Button>Skapa ny kund</Button></Link>
            </Container>
        </Container>
    )
}
