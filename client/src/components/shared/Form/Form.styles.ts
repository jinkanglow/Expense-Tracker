import { styled } from '@mui/material/styles';

export const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '35px 25px',
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  width: '80%',
  maxWidth: '500px',
  margin: '0 auto',
  position: 'relative',
  overflow: 'hidden',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #1976d2, #64b5f6)',
  },
});

export const FormTitle = styled('h2')({
  color: '#1976d2',
  fontSize: '1.75rem',
  fontWeight: 600,
  marginBottom: '1rem',
  textAlign: 'center',
});

export const ErrorMessage = styled('p')({
  color: '#d32f2f',
  margin: '8px 0',
  padding: '10px 16px',
  backgroundColor: 'rgba(211, 47, 47, 0.08)',
  borderRadius: '8px',
  width: '100%',
  textAlign: 'center',
  fontSize: '0.875rem',
  animation: 'fadeIn 0.3s ease',
});

const sharedInputStyles = {
  padding: '10px 12px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  fontSize: '1rem',
  backgroundColor: '#fff',
  color: '#333',
  width: '100%',
  boxSizing: 'border-box',

  '&:focus': {
    borderColor: '#007bff',
    outline: 'none',
  },

  '&:disabled': {
    backgroundColor: '#e9ecef',
    color: '#6c757d',
  },
};

export const StyledSelect = styled('select')({
  ...sharedInputStyles,
  appearance: 'none',
  backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'none\' height=\'24\' stroke=\'currentColor\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><polyline points=\'6 9 12 15 18 9\'/></svg>")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  backgroundSize: '16px',
});

export const StyledTextArea = styled('textarea')({
  ...sharedInputStyles,
  resize: 'vertical',
});