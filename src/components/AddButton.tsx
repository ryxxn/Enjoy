import React, { CSSProperties } from 'react'
import styled from 'styled-components'

const AddBtn = styled.div`
    input{
        display: none;
    }

    label{
        position: relative;
        width: 160px;
        aspect-ratio: 1/1;
        border-radius: 50%;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #EEEEEE;
    }
`

interface PlusIconPropsType {
    rotate: string
}
export const PlusIcon = styled.div<PlusIconPropsType>`
    position: absolute;
    width: calc(100% / 3);
    height: calc(100% / 3 / 5);
    background-color: #D9D9D9;
    transform: rotate(${(props) => props.rotate});
`

interface AddButtonPropsTyle {
    style?: CSSProperties
    iconStyle?: CSSProperties,
    type: string,
    onChange: Function
}

export const AddButton: React.FC<AddButtonPropsTyle> = ({ style = {}, iconStyle = {}, type, onChange }) => {

    return (
        <AddBtn onClick={() => onChange()}>
            <label htmlFor='addBtn' style={style}>
                <PlusIcon rotate={"90deg"} style={iconStyle} />
                <PlusIcon rotate={"0deg"} style={iconStyle} />
            </label>
        </AddBtn>
    )
}
