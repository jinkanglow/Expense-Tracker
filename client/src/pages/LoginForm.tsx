import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/shared/Form/Form';
import { loginUser } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { Typography, Box } from '@mui/material';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<Record<string, string>>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (data: Record<string, string>) => {
    setError('');
    setIsLoading(true);

    try {
      const { username, password } = data;
      const response = await loginUser(username, password);

      if (response.token && response.user) {
        localStorage.setItem('token', response.token);
        login(response.user);
        navigate('/expense-list');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
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
          Welcome Back
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
          Log in to manage your expenses and track your budget
        </Typography>

        {error && <div className="error-message">{error}</div>}
        <Form
          onSubmit={handleSubmit}
          inputs={[
            { name: 'username', type: 'text', placeholder: 'Username' },
            { name: 'password', type: 'password', placeholder: 'Password' },
          ]}
          buttonText={isLoading ? 'Logging in...' : 'Login'}
          disabled={isLoading}
          initialData={formData}
          handleChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default LoginForm;