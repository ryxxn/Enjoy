import React from 'react'
import styled from 'styled-components'

const SearchBox = styled.div`
    width: 100%;
    height: 40px;
    border-radius: 4px;
    border: var(--border);
    margin-top: 40px;

    input{
        border: none;
        background-color: transparent;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        &:focus{
            outline: none;
        }
    }
`

export const SearchBar = () => {
  return (
    <SearchBox>
        <input />
    </SearchBox>
  )
}
