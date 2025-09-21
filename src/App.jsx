import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';
import Dashboard from './components/Dashboard';
import AlertsPanel from './components/AlertsPanel';
import SettingsPanel from './components/SettingsPanel';
import LogsPanel from './components/LogsPanel';
import HistoryPanel from './components/HistoryPanel';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AnimatedBackground />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected Routes */}
          <Route 
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="alerts" element={<AlertsPanel />} />
            <Route path="history" element={<HistoryPanel />} />
            <Route path="logs" element={<LogsPanel />} />
            <Route path="settings" element={<SettingsPanel />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          
          {/* Fallback for any other route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
