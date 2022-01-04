import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { BASE_URL, validateVAT } from '../utils'
import { useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import Label from '../components/Label'
import PrivateRoute from '../components/PrivateRoute'
import Paragraph from '../components/Paragraph'

export default function CustomerCreatePage() {
    const [name, setName] = useState("")
    const [organisationNr, setOrganisationNr] = useState("")
    const [vatNr, setVatNr] = useState("")
    const [reference, setReference] = useState("")
    const [paymentTerm, setPaymentTerm] = useState("")
    const [website, setWebsite] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [isVatValid, setIsVatValid] = useState(true)
    const [message, setMessage] = useState("")

    const navigate = useNavigate()

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const isValid = validateVAT(vatNr)

        setIsVatValid(isValid)

        const url = `${BASE_URL}/api/v1/customers/`
        const token = localStorage.getItem("matte-js3")
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }

        const payload = {
            name,
            organisationNr,
            vatNr,
            reference,
            paymentTerm,
            website,
            email,
            phoneNumber
        }

        if (isValid) {
            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(payload)
            })
                .then(res => {
                    if (res.ok) {
                        navigate("/home")
                    } else {
                        throw new Error("All fields needed")
                    }
                })
                .catch(err => {
                    console.log(err)
                    setIsVatValid(false)
                    setMessage("Alla fält måste vara ifyllda")
                })
        } else {
            setMessage("Momsnummret måste bestå av SE följt av 10 siffror")
        }
    }

    return (
        <PrivateRoute>
            <Container col width={50}>
                <h1>Skapa ny kund</h1>
                {!isVatValid && <Paragraph error>{message}</Paragraph>}
                <form onSubmit={handleOnSubmit}>
                    <Container>
                        <Container col width={30} justify="space-between" gap="1rem">
                            <Label htmlFor="name">Företagsnamn</Label>
                            <Label htmlFor="organisationNr">Organisationsnummer</Label>
                            <Label htmlFor="vatNr">Momsnummer</Label>
                            <Label htmlFor="reference">Kundens referens</Label>
                            <Label htmlFor="paymentTerm">Betalningsvillkor</Label>
                            <Label htmlFor="website">Hemsida</Label>
                            <Label htmlFor="email">Email</Label>
                            <Label htmlFor="phoneNumber">Telefonnummer</Label>
                        </Container>
                        <Container col width={70} justify="space-between" gap="1rem">
                            <Input type="text" id="name" value={name} setValue={setName} placeholder="Företagsnamn" />
                            <Input type="text" id="organisationNr" value={organisationNr} setValue={setOrganisationNr} placeholder="Organisationsnummer" />
                            <Input type="text" id="vatNr" value={vatNr} setValue={setVatNr} placeholder="Momsnummer" />
                            <Input type="text" id="reference" value={reference} setValue={setReference} placeholder="Kundens referens" />
                            <Input type="text" id="paymentTerm" value={paymentTerm} setValue={setPaymentTerm} placeholder="Betalningsvillkor" />
                            <Input type="text" id="website" value={website} setValue={setWebsite} placeholder="Hemsida" />
                            <Input type="text" id="email" value={email} setValue={setEmail} placeholder="Email" />
                            <Input type="text" id="phoneNumber" value={phoneNumber} setValue={setPhoneNumber} placeholder="Telefonnummer" />
                        </Container>
                    </Container>
                    <Container>
                        <Button type="submit">Skapa kund</Button>
                    </Container>
                </form>
            </Container>
        </PrivateRoute>
    )
}
