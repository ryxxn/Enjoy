import React from 'react';
import { Container } from 'src/components/Container';
import styled from 'styled-components';

const TextBox = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: var(--main-color);
    font-size: 52px;
  }
`;

export const Splash = () => {
  return (
    <Container>
      <TextBox>
        <h1>ENJOY</h1>
      </TextBox>
    </Container>
  );
};
