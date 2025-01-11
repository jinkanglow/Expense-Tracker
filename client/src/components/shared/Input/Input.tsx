import React from 'react';
import { StyledTextField } from './Input.styles';

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <StyledTextField
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default Input;
