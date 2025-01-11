import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../../hooks/useAuth';
import Header from './Header';
import Footer from './Footer';
import '../../styles/layout/Layout.scss';

interface LayoutProps {
  children: React.ReactNode;
  variant?: 'landing' | 'auth' | 'app';
}

const Layout: React.FC<LayoutProps> = ({ children, variant = 'app' }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  // Redirect to dashboard if user is logged in and tries to access landing/auth pages
  if (isLoggedIn && (variant === 'landing' || variant === 'auth')) {
    return <Navigate to="/dashboard" />;
  }

  // Redirect to login if user is not logged in and tries to access app pages
  if (!isLoggedIn && variant === 'app') {
    return <Navigate to="/login" />;
  }

  return (
    <div className={`layout ${variant}`}>
      {/* Backward Button - Show on auth pages */}
      {variant === 'auth' && (
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleBackClick} aria-label="back">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">
              Authentication
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Header - Show on landing and app pages, hide on auth pages */}
      {variant !== 'auth' && <Header variant={variant} />}

      {/* Main Content */}
        <main className={`main-content ${variant}`}>{children}</main>

      {/* Footer - Show on landing and auth pages and app pages */}
      <Footer />
    </div>
  );
};

export default Layout;