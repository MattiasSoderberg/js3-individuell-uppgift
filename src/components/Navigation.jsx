import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { UserContext } from '../App'

const StyledNavigation = styled.div`
    width: 100%;
    height: 5rem;
    background-color: #457ae6dd;
    position: sticky;
    top: 0;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const UserInfoContainer = styled.div`
    width: 40%
    height: 100%
    display: flex;
    flex-direction: column;
    margin-left: 3rem;
`
const UserInfoHeading = styled.h4`
    margin: 0;
    font-weight: 400;
    align-self: start;
    margin-bottom: 0.4rem;
`
const UserInfo = styled.p`
    font-size: 0.9rem;
    margin: 0;
`
const Navbutton = styled.button`
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin-left: auto;
    margin-right: 3rem;
    background: #457ae600;
    border: 1px solid black;

    :hover {
        background: #457ae6;
        transform: scale(1.02);
    }
`

export default function Navigation() {
    const { user, setUser, setCustomerList } = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        setUser(null)
        setCustomerList([])
        localStorage.removeItem("matte-js3")
        navigate("/")
    }

    return (
        <StyledNavigation>
            {user &&
                <UserInfoContainer>
                    <UserInfoHeading>Inloggad som:</UserInfoHeading>
                    <UserInfo>{user.firstName} {user.lastName}</UserInfo>
                    <UserInfo>({user.email})</UserInfo>
                </UserInfoContainer>
            }
            <Navbutton onClick={handleLogout}>Logga ut</Navbutton>
        </StyledNavigation>
    )
}
