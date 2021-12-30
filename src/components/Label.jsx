import React from 'react'
import styled from 'styled-components'

const StyledLabel = styled.label`
    padding: 1rem 0;
    font-size: 1.2rem;
`

export default function Label({ children }) {
    return (
        <StyledLabel>
            {children}
        </StyledLabel>
    )
}
