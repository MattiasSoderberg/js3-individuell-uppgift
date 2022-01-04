import React from 'react'
import styled from 'styled-components'

const StyledP = styled.p`
    margin: 0;
`
const StyledErrorP = styled(StyledP)`
    color: red;
`

export default function Paragraph(props) {
    return (
        <>
            {props.error ?
                <StyledErrorP>
                    {props.children}
                </StyledErrorP>
                : <StyledP>
                    {props.children}
                </StyledP>
            }
        </>

    )
}
