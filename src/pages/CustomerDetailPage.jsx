import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Container from '../components/Container'
import Input from '../components/Input'
import Label from '../components/Label'
import PrivateRoute from '../components/PrivateRoute'
import { BASE_URL } from '../utils'

export default function CustomerDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [customer, setCustomer] = useState(null)
    const [showMessage, setShowMessage] = useState(true)
    const [message, setMessage] = useState("")
    const [name, setName] = useState("")
    const [organisationNr, setOrganisationNr] = useState("")
    const [vatNr, setVatNr] = useState("")
    const [reference, setReference] = useState("")
    const [paymentTerm, setPaymentTerm] = useState("")
    const [website, setWebsite] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    useEffect(() => {
        const url = `${BASE_URL}/api/v1/customers/${id}/`
        const token = localStorage.getItem("matte-js3")
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }

        setMessage("Laddar...")

        fetch(url, {
            method: "GET",
            headers: headers
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setShowMessage(false)
                setCustomer(data)
                setName(data.name)
                setOrganisationNr(data.organisationNr)
                setVatNr(data.vatNr)
                setReference(data.reference)
                setPaymentTerm(data.paymentTerm)
                setWebsite(data.website)
                setEmail(data.email)
                setPhoneNumber(data.phoneNumber)
            })

    }, [id])

    const handleOnDelete = () => {
        const url = `${BASE_URL}/api/v1/customers/${id}/`
        const token = localStorage.getItem("matte-js3")
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        fetch(url, {
            method: "DELETE",
            headers: headers
        })
            .then(res => {
                setShowMessage(true)
                setMessage("Raderar kund")
                console.log(res)
                setTimeout(() => {
                    navigate("/home")
                }, 1000)
            })
    }

    const handleOnPatch = () => {
        const url = `${BASE_URL}/api/v1/customers/${id}/`
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

        fetch(url, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(payload)
        })
            .then(res => {
                setShowMessage(true)
                setMessage("Uppgifter uppdaterade")
                setTimeout(() => {
                    setShowMessage(false)
                }, 1000)
            })
    }

    return (
        <PrivateRoute>
            <Container col width={50}>
                {customer && !showMessage ?
                    <>
                        <h1>{name}</h1>
                        <Container width={100}>
                            <Container col width={30} justify="space-between" gap="1rem">
                                <Label htmlFor="name">Företagsnamn</Label>
                                <Label htmlFor="orgNr">Organisationsnummer</Label>
                                <Label htmlFor="ref">Kundens referens</Label>
                                <Label htmlFor="paymentTerm">Betalningsvillkor</Label>
                                <Label htmlFor="vatNr">Momsnummer</Label>
                                <Label htmlFor="email">Email</Label>
                                <Label htmlFor="phoneNr">Telefonnummer</Label>
                                <Label htmlFor="website">Hemsida</Label>
                            </Container>
                            <Container col width={70} justify="space-between">
                                <Input type="text" id="name" value={name} setValue={setName} />
                                <Input type="text" id="orgNr" value={organisationNr} setValue={setOrganisationNr} />
                                <Input type="text" id="ref" value={reference} setValue={setReference} />
                                <Input type="text" id="paymentTerm" value={paymentTerm} setValue={setPaymentTerm} />
                                <Input type="text" id="vatNr" value={vatNr} setValue={setVatNr} />
                                <Input type="text" id="email" value={email} setValue={setEmail} />
                                <Input type="text" id="phoneNr" value={phoneNumber} setValue={setPhoneNumber} />
                                <Input type="text" id="website" value={website} setValue={setWebsite} />
                            </Container>
                        </Container>
                        <Container gap="6rem">
                            <Button danger onClick={handleOnDelete}>Delete</Button>
                            <Button onClick={handleOnPatch}>Ändra</Button>
                        </Container>
                    </>
                    : <p>{message}</p>}
            </Container>
        </PrivateRoute>
    )
}
