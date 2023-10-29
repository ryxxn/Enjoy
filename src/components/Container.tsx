import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { CSSProperties } from 'react'

const StyledDiv = styled.div`
    margin: 0;
    width: 100%;
    min-height: 100;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    box-sizing: border-box;
`

export const Content = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    box-sizing: border-box;
`

interface PropsType {
  children: ReactNode,
  style?: CSSProperties
}
export const Container: React.FC<PropsType> = ({ children, style = {} }) => {
  return (
    <StyledDiv style={style}>
      {children}
    </StyledDiv>
  )
}
