import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import Dashboard from './pages/Dashboard';
import ExpenseList from './pages/ExpenseList';
import BudgetSummary from './pages/BudgetSummary';
import LandingPage from './pages/LandingPage';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './hooks/useAuth';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <Layout variant="landing">
              <LandingPage />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout variant="auth">
              <LoginForm />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout variant="auth">
              <RegisterForm />
            </Layout>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout variant="app">
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Layout variant="app">
                <ExpenseList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/budgets"
          element={
            <ProtectedRoute>
              <Layout variant="app">
                <BudgetSummary />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Catch all route - Redirect to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;