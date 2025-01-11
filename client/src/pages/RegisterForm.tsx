import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/shared/Form/Form';
import { registerUser } from '../services/api';
import { Typography, Box } from '@mui/material';

const RegisterForm: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: Record<string, string>) => {
    setError('');
    setIsLoading(true);

    try {
      const { username, password, email } = data;

      if (!username || !password || !email) {
        throw new Error('All fields are required');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      await registerUser(username, password, email);
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        minHeight: 'calc(100vh - 200px)', // Adjust for header/footer
        margin: '0 auto',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '420px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: 600,
            background: 'linear-gradient(45deg, #1976d2, #2196f3)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontSize: '2rem',
          }}
        >
          Create Account
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: 'text.secondary',
            maxWidth: '320px',
            lineHeight: 1.5,
          }}
        >
          Join BudgetTracker to start managing your finances effectively
        </Typography>

        {error && <div className="error-message">{error}</div>}
        <Form
          onSubmit={handleSubmit}
          inputs={[
            {
              name: 'username',
              type: 'text',
              placeholder: 'Username',
              required: true,
              minLength: 3,
            },
            {
              name: 'password',
              type: 'password',
              placeholder: 'Password',
              required: true,
              minLength: 6,
            },
            {
              name: 'email',
              type: 'email',
              placeholder: 'Email',
              required: true,
            },
          ]}
          buttonText={isLoading ? 'Registering...' : 'Register'}
          disabled={isLoading}
        />
      </Box>
    </Box>
  );
};

export default RegisterForm;
