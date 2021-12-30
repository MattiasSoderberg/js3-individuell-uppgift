import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom"

const StyledLinkComponent = styled(Link)`
    text-decoration: none;
    color: #000;
    font-size: 1.2rem;
    margin-bottom: 1rem;

    :hover {
        color: #8992a3;
    }
`

export default function StyledLink(props) {
    return (
        <>
            <StyledLinkComponent to={props.to}>
                {props.children}
            </StyledLinkComponent>
        </>
    )
}
