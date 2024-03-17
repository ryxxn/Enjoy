import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// components
import { Splash } from 'src/pages/common/splash/Splash';
import { useAuthContext } from './AuthProvider';
import Login from 'src/pages/common/login';
import { useUserStore } from 'src/store/userStore';
import { Authority, UserStaus } from 'src/types/types';
import Pending from 'src/pages/common/pending';
import Reject from 'src/pages/common/reject';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isLoggedIn, loading } = useAuthContext();

  const { userData } = useUserStore();

  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  const isAdmin = userData?.authority !== Authority.USER;
  const userState = userData?.status;

  if (loading) {
    return <Splash />;
  }

  if (!isLoggedIn) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (userState === UserStaus.PENDING) {
    return <Pending />;
  }

  if (userState === UserStaus.REJECTED) {
    return <Reject />;
  }

  // Admin protected route
  if (!isAdmin && pathname.includes('/admin')) {
    return <Navigate to='/' />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <> {children} </>;
}
