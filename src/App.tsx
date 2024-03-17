import './App.css';
import './styles/globals.scss';
import './styles/colors.scss';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import ConfirmProvider from './provider/ConfirmProvider';
import AuthGuard from './auth/AuthGuard';
import Router from './routes';
import { AuthProvider } from './auth/AuthProvider';

function App() {
  return (
    <SnackbarProvider>
      <ConfirmProvider>
        <BrowserRouter>
          <AuthProvider>
            <AuthGuard>
              <Router />
            </AuthGuard>
          </AuthProvider>
        </BrowserRouter>
      </ConfirmProvider>
    </SnackbarProvider>
  );
}

export default App;
