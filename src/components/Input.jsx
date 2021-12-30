import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
    border: none;
    outline: none;
    box-shadow: 0px 0px 6px 2px lightgray;
    border-radius: 2px;
    padding: 1rem;
    font-size: 1rem;

    :focus {
        box-shadow: 0px 0px 6px 2px skyblue;
        background: #F2F8F9;
    }
`
const StyledSelect = styled.select`
    border: none;
    outline: none;
    box-shadow: 0px 0px 6px 2px lightgray;
    border-radius: 2px;
    padding: 1rem;
    font-size: 1rem;

    :focus {
        box-shadow: 0px 0px 6px 2px skyblue;
        background: #F2F8F9;
    }
`

export default function Input({ children, select, type, value, setValue, placeholder }) {
    return (
        <>
            {select ?
                <StyledSelect value={value} onChange={e => setValue(e.target.value)}>
                    {children}
                </StyledSelect>
                :
                <StyledInput type={type} value={value} onChange={e => setValue(e.target.value)} placeholder={placeholder} />
            }
        </>
    )
}
