import React, { useState } from 'react';
import { Box, Select, MenuItem, TextField, Button } from '@mui/material';

interface BudgetFormProps {
  onSubmit: (data: Record<string, string>) => void;
  categories: string[];
}

const BudgetForm: React.FC<BudgetFormProps> = ({ onSubmit, categories }) => {
  const [formData, setFormData] = useState({
    category: '',
    limit: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Select
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        required
        displayEmpty
        fullWidth
      >
        <MenuItem value="" disabled>
          Select category
        </MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>

      <TextField
        type="number"
        value={formData.limit}
        onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
        placeholder="Enter monthly limit"
        required
        fullWidth
        inputProps={{ min: 0 }}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Set Budget
      </Button>
    </Box>
  );
};

export default BudgetForm;
