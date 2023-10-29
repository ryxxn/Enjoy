import React from 'react'
import { styled } from 'styled-components'

const HeadingBox = styled.div`
    width: 100%;
    text-transform: uppercase;
    font-weight: 700;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: 20px;


    .h1{
        margin: 0;
        color: var(--black);
        font-size: 28px;
    }
    p{
        margin: 0;
        font-size: 16px;
        color: #BCBCBC;
    }
`

interface HeadingPropsType {
    heading: string,
    subText: string
}

export const Heading: React.FC<HeadingPropsType> = ({ heading, subText }) => {
    return (
        <HeadingBox>
            <h1 className="h1">{heading}</h1>
            <p>{subText}</p>
        </HeadingBox>
    )
}
