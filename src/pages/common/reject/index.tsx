import React from 'react';
import { Container } from 'src/components/Container';
import styled from 'styled-components';

const TextBox = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  h1 {
    color: var(--main-color);
    font-size: 52px;
    margin-bottom: 20px;
  }
`;

const RejectPage = () => {
  return (
    <Container>
      <TextBox>
        <h1>ENJOY</h1>
        <p>서비스 이용 권한 요청이 거절되었습니다.</p>
        <p>관리자에게 문의해주세요.</p>
      </TextBox>
    </Container>
  );
};

export default RejectPage;
