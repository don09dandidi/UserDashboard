import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { TwoFA } from './pages/auth/TwoFA';
import { Dashboard } from './pages/Dashboard';
import { MyFiles } from './pages/MyFiles';
import { Shared } from './pages/Shared';
import { RecycleBin } from './pages/RecycleBin';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/2fa" element={<TwoFA />} />

          {/* App */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/files" element={<MyFiles />} />
            <Route path="/shared" element={<Shared />} />
            <Route path="/recycle-bin" element={<RecycleBin />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Default */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
