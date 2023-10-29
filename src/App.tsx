import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Stamps } from './pages/Stamps';
import { Notice } from './pages/Notice';
import { Media } from './pages/Media';
import "./colors.css"
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {

  const [loading, setLoading] = useState<boolean>(true)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => { // user 판명을 듣고 
      if(user) { // 있으면
        setIsLoggedIn(true); // 로그인 됨
      } else {
        setIsLoggedIn(false); // 로그인 안됨
      }
      setLoading(false);
    });
  }, [])

  
  return (
    <BrowserRouter>
      <>
        {isLoggedIn ?
          <Routes>
            <Route path='/profile' element={<Profile />} />
            <Route path='/stamps' element={<Stamps />} />
            <Route path='/notice' element={<Notice />} />
            {/* <Route path='/notice/:id' element={<Notice />} /> */}
            <Route path='/media' element={<Media />} />
            <Route path='/*' element={<Navigate to="profile" />} />
          </Routes>
          :
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/*' element={<Navigate to="login" />} />
          </Routes>
        }
      </>
    </BrowserRouter >
  );
}

export default App;
