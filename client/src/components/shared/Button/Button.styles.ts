import { styled } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';

export const StyledButton = styled(MuiButton)({
  padding: '10px 24px',
  minWidth: '150px',
  height: '42px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '0.875rem',
  fontWeight: 600,
  color: '#fff', // Ensure text color is white
  background: 'linear-gradient(45deg, #1976d2, #2196f3)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',

  '&:hover': {
    background: 'linear-gradient(45deg, #1565c0, #1976d2)',
    boxShadow: '0 6px 10px rgba(33, 150, 243, 0.3)',
    transform: 'translateY(-2px)',
  },

  '&:active': {
    background: 'linear-gradient(45deg, #0d47a1, #1565c0)',
    boxShadow: '0 2px 4px rgba(33, 150, 243, 0.2)',
    transform: 'translateY(0)',
  },

  '&:disabled': {
    background: 'rgba(0, 0, 0, 0.12)',
    color: 'rgba(0, 0, 0, 0.38)',
    boxShadow: 'none',
  },
});