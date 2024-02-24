import React, { useEffect, useState } from 'react';
import './styles/globals.css';
import './App.css';
import './colors.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/user/Login';
import { Profile } from './pages/user/Profile';
import { Stamps } from './pages/user/Stamps';
import { Notice } from './pages/user/Notice';
import { Media } from './pages/user/Media';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { Admin } from './pages/admin/Admin';
import AdminMain from './pages/admin/main/Main';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // user 판명을 듣고
      if (user) {
        // 있으면
        setIsLoggedIn(true); // 로그인 됨
      } else {
        setIsLoggedIn(false); // 로그인 안됨
      }
      setLoading(false);
    });
  }, []);

  const isAdmin = true;

  return (
    <BrowserRouter>
      <>
        {isLoggedIn ? (
          <Routes>
            <Route path='/profile' element={<Profile />} />
            <Route path='/stamps' element={<Stamps />} />
            <Route path='/notice' element={<Notice />} />
            {/* <Route path='/notice/:id' element={<Notice />} /> */}
            <Route path='/media' element={<Media />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/admin/main' element={<AdminMain />} />
            <Route path='/*' element={<Navigate to='profile' />} />
          </Routes>
        ) : (
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/*' element={<Navigate to='login' />} />
          </Routes>
        )}
      </>
    </BrowserRouter>
  );
}

export default App;
