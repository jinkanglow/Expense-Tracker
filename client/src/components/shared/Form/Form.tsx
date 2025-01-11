import React, { useState, useEffect } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { StyledForm, StyledSelect, StyledTextArea } from './Form.styles';
import isEqual from 'lodash/isEqual';

interface FormInput {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  minLength?: number;
  options?: { value: string; label: string }[];
}

interface FormProps {
  onSubmit: (data: Record<string, string>) => void;
  inputs: FormInput[];
  buttonText: string;
  action?: string;
  method?: string;
  disabled?: boolean;
  initialData?: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  inputs,
  buttonText,
  action = '',
  method = 'post',
  disabled = false,
  initialData = {},
  handleChange,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initialDataState: Record<string, string> = {};
    inputs.forEach((input) => {
      initialDataState[input.name] = initialData[input.name] || '';
    });
    return initialDataState;
  });

  useEffect(() => {
    if (Object.keys(initialData).length === 0) return;

    const updatedData: Record<string, string> = {};
    inputs.forEach((input) => {
      updatedData[input.name] = initialData[input.name] || '';
    });
    if (!isEqual(updatedData, formData)) {
      setFormData(updatedData);
      console.log('inputs', inputs);
      console.log('updatedData', updatedData);
      console.log('initialData', initialData);
    }
  }, [initialData, inputs]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit} action={action} method={method}>
      {inputs.map((input) => (
        <div key={input.name} style={{ width: '100%' }}>
          {input.type === 'select' ? (
            <StyledSelect
              name={input.name}
              value={formData[input.name]}
              onChange={handleChange}
              disabled={disabled}
            >
              <option value="" disabled>{input.placeholder}</option>
              {input.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </StyledSelect>
          ) : input.type === 'textarea' ? (
            <StyledTextArea
              name={input.name}
              placeholder={input.placeholder}
              value={formData[input.name]}
              onChange={handleChange}
              disabled={disabled}
            />
          ) : (
            <Input
              name={input.name}
              type={input.type}
              placeholder={input.placeholder}
              value={formData[input.name]}
              onChange={handleChange}
              disabled={disabled}
              style={{ width: '100%' }}
            />
          )}
        </div>
      ))}
      <Button
        type="submit"
        text={buttonText}
        disabled={disabled}
      />
    </StyledForm>
  );
};

export default Form;