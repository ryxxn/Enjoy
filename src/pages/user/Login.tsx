import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Container } from '../../components/Container';
import { useNavigate } from 'react-router-dom';
import {
  googleSignUpWithPopup,
  googleSignUpWithRedirect,
  handleGoogleRedirectResult,
} from '../../services/login.services';
import { isIOS, isMobile } from 'react-device-detect';

const LoginButton = styled.button`
  width: 100%;
  height: 66px;
  background-color: var(--main-color);
  border: none;
  border-radius: 8px;
  font-size: 26px;
  font-weight: bold;
  color: var(--white);
  margin-bottom: 32px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 15%);
  box-sizing: border-box;
`;
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

const LoginButtonBox = styled.div`
  position: absolute;
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
  height: 166px;
  bottom: 0;

  p {
    margin: 0;
    white-space: pre-wrap;
    text-align: center;
    font-size: 12px;
    color: rgba(0, 0, 0, 42%);
  }
`;

export const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const domain = process.env.REACT_APP_PROJECT_DOMAIN!;
  const currentPath = window.location.href;

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const usePopupLogin = isMobile || !currentPath.includes(domain);
      if (usePopupLogin) {
        await googleSignUpWithPopup();
      } else {
        // firebase 인증 문제 해결 전까지는 popup 방식으로 진행
        await googleSignUpWithPopup();
        // await googleSignUpWithRedirect();
      }
      setLoading(false);
      // navigate('/profile');
    } catch (err: any) {
      setLoading(false);
      alert('회원가입 실패\n err :' + err);
    }
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      await handleGoogleRedirectResult()
        .then(() => {
          setLoading(false);
        })
        .catch((err: any) => {
          setLoading(false);
          alert('로그인 실패\n err : ' + err);
        });
    })();
  }, []);

  return (
    <Container>
      <TextBox>
        <h1>ENJOY</h1>
      </TextBox>
      <LoginButtonBox>
        <LoginButton onClick={() => handleGoogleLogin()}>START</LoginButton>
        <p>
          {
            '경희대학교 이메일 (khu.ac.kr)로 시작 가능합니다.\n문의사항 : cultour15@naver.com'
          }
        </p>
      </LoginButtonBox>
    </Container>
  );
};
