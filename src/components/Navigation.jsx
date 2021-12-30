import React, { useContext } from 'react'
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
`
const UserInfoContainer = styled.div`
    width: 40%
    height: 100%
    display: flex;
    flex-direction: column;
    padding: 2rem;

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

export default function Navigation() {
    const { user } = useContext(UserContext)

    return (
        <StyledNavigation>
            {user &&
                <UserInfoContainer>
                    <UserInfoHeading>Inloggad som:</UserInfoHeading>
                    <UserInfo>{user.firstName} {user.lastName}</UserInfo>
                    <UserInfo>({user.email})</UserInfo>
                </UserInfoContainer>
            }
        </StyledNavigation>
    )
}
