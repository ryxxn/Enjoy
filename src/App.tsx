import React, { useEffect, useState } from 'react';
import './App.css';
import './styles/globals.scss';
import './styles/colors.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Login } from './pages/user/Login';
import { Profile } from './pages/user/Profile';
import { Stamps } from './pages/user/Stamps';
import { Notice } from './pages/user/Notice';
import { Media } from './pages/user/Media';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import AdminMain from './pages/admin/main/Main';
import { useUserStore } from './store/userStore';
import AdminUsers from './pages/admin/users';
import AdminStamps from './pages/admin/stamps/Stamps';
import AdminNotice from './pages/admin/notice/Notice';
import AdminMedia from './pages/admin/media/Media';
import AdminStampDetail from './pages/admin/stamps/detail/StampDetail';
import AdminStampAdd from './pages/admin/stamps/add/StampAdd';
import ConfirmProvider from './provider/ConfirmProvider';
import AdminNoticeAdd from './pages/admin/notice/add/NoticeAdd';
import AdminNoticeDetail from './pages/admin/notice/detail/NoticeDetail';
import { Authority } from './types/types';
import { Splash } from './pages/common/Splash';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const { userData, fetchUserData } = useUserStore();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // user 판명을 듣고
      console.log('App.tsx -> user', user);
      if (user) {
        // 있으면
        fetchUserData().then(() => {
          setIsLoggedIn(true); // 로그인 됨
        });
      } else {
        setIsLoggedIn(false); // 로그인 안됨
      }
      setLoading(false);
    });
  }, []);

  const isAdmin = userData?.authority !== Authority.USER;

  if (loading) {
    return <Splash />;
  }

  return (
    <SnackbarProvider>
      <ConfirmProvider>
        <BrowserRouter>
          <>
            {isLoggedIn ? (
              <Routes>
                <Route path='/profile' element={<Profile />} />
                <Route path='/stamps' element={<Stamps />} />
                <Route path='/notice' element={<Notice />} />
                {/* <Route path='/notice/:id' element={<Notice />} /> */}
                <Route path='/media' element={<Media />} />
                {isAdmin && (
                  <>
                    <Route path='/admin/main' element={<AdminMain />} />
                    <Route path='/admin/users' element={<AdminUsers />} />
                    <Route path='/admin/stamps' element={<AdminStamps />} />
                    <Route
                      path='/admin/stamps/:id'
                      element={<AdminStampDetail />}
                    />
                    <Route
                      path='/admin/stamps/add'
                      element={<AdminStampAdd />}
                    />
                    <Route path='/admin/notice' element={<AdminNotice />} />
                    <Route
                      path='/admin/notice/add'
                      element={<AdminNoticeAdd />}
                    />
                    <Route
                      path='/admin/notice/:id'
                      element={<AdminNoticeDetail />}
                    />
                    <Route path='/admin/media' element={<AdminMedia />} />
                    <Route
                      path='/admin/'
                      element={<Navigate to='/admin/main' />}
                    />
                  </>
                )}
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
      </ConfirmProvider>
    </SnackbarProvider>
  );
}

export default App;
