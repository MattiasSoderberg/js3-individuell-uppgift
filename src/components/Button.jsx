import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    padding: 1rem 2.5rem;
    background: ${props => props.color ? props.color : "#738CED" };
    color: white;
    border: none;
    font-size: 1.2rem;
    box-shadow: 2px 3px 5px lightgray;
    transition: all ease 250ms;

    &:hover {
        transform: scale(1.01);
        box-shadow: 3px 4px 7px gray;
        background: ${props => props.hoverColor ? props.hoverColor : "#4567EA"};
    }
`
const StyledButtonDanger = styled(StyledButton)`
    background: #F16969;
    color: black;

    :hover {
        background: #FB5151;
    }
`

export default function Button(props) {
    return (
        <>
            {props.danger ? 
                <StyledButtonDanger {...props}>
                    {props.children}
                </StyledButtonDanger>
                :
                <StyledButton {...props}>
                    {props.children}
                </StyledButton>
                }
        </>
    )
}
