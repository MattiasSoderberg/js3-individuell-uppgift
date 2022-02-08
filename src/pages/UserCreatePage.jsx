import React, { useState } from 'react'
import Container from '../components/Container'
import Label from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'
import { BASE_URL } from '../utils'
import Paragraph from '../components/Paragraph'

export default function UserCreatePage() {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [organisationName, setOrganisationName] = useState("")
    const [organisationKind, setOrganisationKind] = useState("default")
    const [isPending, setIsPending] = useState(false)
    const [message, setMessage] = useState("")

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const url = `${BASE_URL}/auth/users/`
        const headers = {
            "Content-Type": "application/json"
        }
        const payload = {
            firstName,
            lastName,
            email,
            password,
            organisationName,
            organisationKind
        }

        console.log(payload)

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error("Missing information")
                }
            })
            .then(data => setIsPending(true))
            .catch(err => setMessage("Du måste fylla i alla fält"))
    }

    return (
        <Container col width={60}>
            {isPending ?
                <p>Klicka på aktiveringslänken i mailet du fått.</p>
                :
                <>
                    <h1>Skapa användare</h1>
                    {message && <Paragraph error>{message}</Paragraph>}
                    <form onSubmit={handleOnSubmit}>
                        <Container>
                            <Container col width={25} justify="space-between" gap="1rem">
                                <Label htmlFor="firstName">Förnamn</Label>
                                <Label htmlFor="lastName">Efternamn</Label>
                                <Label htmlFor="organisationName">Företagsnamn</Label>
                                <Label htmlFor="organisationKind">Företagstyp</Label>
                                <Label htmlFor="email">Email</Label>
                                <Label htmlFor="password">Lösenord</Label>
                            </Container>
                            <Container col width={50} justify="space-between" gap="1rem">
                                <Input type="text" id="firstName" value={firstName} setValue={setFirstName} placeholder="Förnamn" />
                                <Input type="text" id="lastName" value={lastName} setValue={setLastName} placeholder="Efternamn" />
                                <Input type="text" id="organisationName" value={organisationName} setValue={setOrganisationName} placeholder="Företagsnamn" />
                                <Input select id="organisationKind" value={organisationKind} setValue={setOrganisationKind}>
                                    <option disabled value="default">Välj något</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </Input>
                                <Input type="text" id="email" value={email} setValue={setEmail} placeholder="Email" />
                                <Input type="password" id="password" value={password} setValue={setPassword} placeholder="Password" />
                            </Container>
                        </Container>
                            <Container>
                                <Button type="submit">Skapa användare</Button>
                            </Container>
                    </form>
                </>
            }
        </Container>
    )
}
