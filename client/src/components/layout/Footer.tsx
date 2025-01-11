import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/layout/Footer.scss';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h4>BudgetTracker</h4>
            <p>Take control of your finances with ease</p>
          </div>
          <div className="footer-nav">
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/features">Features</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <p>&copy; {currentYear} BudgetTracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;