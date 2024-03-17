import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from 'src/firebase';
import { useUserStore } from 'src/store/userStore';
import { googleSignUpWithPopup } from 'src/services/login.services';

interface AuthContextProps {
  isLoggedIn: boolean;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const { fetchUserData } = useUserStore();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUserData();
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.currentUser]);

  const login = useCallback(() => {
    googleSignUpWithPopup();
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    setIsLoggedIn(false);
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn,
      loading,
      login,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoggedIn, loading, auth?.currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
