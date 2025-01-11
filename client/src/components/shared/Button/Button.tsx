import React from 'react';
import { ButtonProps as MuiButtonProps } from '@mui/material';
import { StyledButton } from './Button.styles';

interface ButtonProps extends MuiButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text, ...props }) => {
  return (
    <StyledButton {...props} className={`custom-button ${props.className}`}>
      {text}
    </StyledButton>
  );
};

export default Button;