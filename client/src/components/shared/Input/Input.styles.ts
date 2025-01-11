import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

export const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    width: '320px',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    transition: 'all 0.3s ease',

    '&:hover': {
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.04)',
    },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.12)',
      borderWidth: '1.5px',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(25, 118, 210, 0.6)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
      borderWidth: '2px',
      boxShadow: '0 0 0 4px rgba(25, 118, 210, 0.08)',
    },
  },
  '& .MuiInputBase-input': {
    padding: '14px 16px',
    fontSize: '1rem',
    '&::placeholder': {
      color: 'rgba(0, 0, 0, 0.4)',
    },
  },
  margin: '6px 0',
});
