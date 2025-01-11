import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaWallet, FaLock, FaChartPie } from 'react-icons/fa';
import '../styles/pages/LandingPage.scss';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Take Control of Your Finances</h1>
          <p className="hero-subtitle">
            Track expenses, manage budgets, and achieve your financial goals
          </p>
          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => navigate('/register')}
            >
              Get Started Free
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose BudgetTracker?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FaChartLine className="feature-icon" />
              <h3>Expense Tracking</h3>
              <p>Easily track and categorize all your expenses in one place</p>
            </div>
            <div className="feature-card">
              <FaWallet className="feature-icon" />
              <h3>Budget Management</h3>
              <p>Set and manage budgets for different spending categories</p>
            </div>
            <div className="feature-card">
              <FaChartPie className="feature-icon" />
              <h3>Visual Reports</h3>
              <p>Get clear insights with interactive charts and reports</p>
            </div>
            <div className="feature-card">
              <FaLock className="feature-icon" />
              <h3>Secure & Private</h3>
              <p>Your financial data is encrypted and secure</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start?</h2>
          <p>
            Join thousands of users who are already managing their finances
            better
          </p>
          <button className="btn-primary" onClick={() => navigate('/register')}>
            Create Free Account
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;