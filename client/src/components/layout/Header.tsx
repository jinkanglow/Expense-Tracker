import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  FaChartLine,
  FaWallet,
  FaChartBar,
  FaRegLightbulb,
  FaUser,
  FaSignOutAlt,
} from 'react-icons/fa';
import '../../styles/layout/Header.scss';

interface HeaderProps {
  variant: 'landing' | 'app';
}

const Header: React.FC<HeaderProps> = ({ variant }) => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true }); // Redirect to landing page immediately after logout
  };

  return (
    <header className={`header ${variant}`}>
      <div className="container">
        <div className="logo" onClick={() => navigate(isLoggedIn ? '/dashboard' : '/')}>
          <FaChartLine className="logo-icon" />
          <span>BudgetTracker</span>
        </div>

        <nav className="nav-menu">
          {isLoggedIn ? (
            <>
              <div className="nav-links">
                <div className="nav-link" onClick={() => navigate('/dashboard')}>
                  <FaChartBar /> Dashboard
                </div>
                <div className="nav-link" onClick={() => navigate('/expenses')}>
                  <FaWallet /> Expenses
                </div>
                <div className="nav-link" onClick={() => navigate('/budgets')}>
                  <FaChartLine /> Budgets
                </div>
              </div>
              <div className="user-actions">
                <div className="account-link" onClick={() => navigate('/account')}>
                  <FaUser />
                  <span>Account</span>
                </div>
                <button className="btn-logout" onClick={handleLogout}>
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            // Public Navigation
            <>
              <div className="nav-links">
                <div className="nav-link" onClick={() => navigate('/features')}>
                  <FaRegLightbulb /> Features
                </div>
                <div className="nav-link" onClick={() => navigate('/pricing')}>
                  Pricing
                </div>
                <a href="#testimonials" className="nav-link">
                  Testimonials
                </a>
              </div>
              <div className="auth-buttons">
                <button
                  className="btn-login"
                  onClick={() => navigate('/login')}
                >
                  Log In
                </button>
                <button
                  className="btn-signup"
                  onClick={() => navigate('/register')}
                >
                  Start Free Trial
                </button>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;