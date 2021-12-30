import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
    width: ${props => props.width}%;
    display: flex;
    justify-content: ${props => props.justify};
    flex-wrap: wrap;
    padding: 1rem 0;
    gap: ${props => props.gap}
`
const ColContainer = styled(StyledContainer)`
    flex-direction: column;
`

export default function Container(props) {
    return (
        <>
            {props.col ?
                <ColContainer width={props.width} justify={props.justify} gap={props.gap}>
                    {props.children}
                </ColContainer>
                :
                <StyledContainer width={props.width} justify={props.justify} gap={props.gap}>
                    {props.children}
                </StyledContainer>
            }
        </>
    )
}
