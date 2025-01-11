import React, { useState, useEffect } from 'react';
import { getBudgetSummary, setBudget, updateBudget, deleteBudget } from '../services/api';
import Table from '../components/shared/Table/Table';
import Button from '../components/shared/Button/Button';
import BudgetForm from '../pages/BudgetForm';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/pages/BudgetSummary.scss';

interface BudgetSummary {
  category: string;
  limit: number;
  spent: number;
  remaining: number;
}

const categories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Bills & Utilities',
  'Entertainment',
  'Healthcare',
  'Travel',
  'Education',
  'Other',
];

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const BudgetSummary: React.FC = () => {
  const [budgetSummary, setBudgetSummary] = useState<BudgetSummary[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<BudgetSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBudgetSummary();
  }, []);

  const fetchBudgetSummary = async () => {
    try {
      const data = await getBudgetSummary();
      setBudgetSummary(data);
    } catch (error) {
      console.error('Error fetching budget summary:', error);
    }
  };

  const handleSetBudget = async (data: Record<string, string>) => {
    try {
      if (!selectedBudget) {
        await setBudget(data.category, Number(data.limit));
      } else {
        await updateBudget(data.category, Number(data.limit));
      }
      setIsModalOpen(false);
      fetchBudgetSummary();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to set budget');
    }
  };

  const handleEdit = (budget: BudgetSummary) => {
    setSelectedBudget(budget);
    setIsModalOpen(true);
  };

  const handleDelete = async (category: string) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      try {
        await deleteBudget(category);
        fetchBudgetSummary();
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to delete budget');
      }
    }
  };

  const headers = ['Category', 'Monthly Budget', 'Spent', 'Remaining', 'Status', 'Actions'];

  const rows = budgetSummary.map((summary) => {
    const statusClass = summary.remaining < 0 
      ? 'exceeded' 
      : summary.remaining < summary.limit * 0.2 
      ? 'warning' 
      : 'on-track';

    const statusMessage = summary.remaining < 0 
      ? `Over by ${formatCurrency(Math.abs(summary.remaining))}` 
      : `${formatCurrency(summary.remaining)} left`;

    return [
      summary.category,
      formatCurrency(summary.limit),
      formatCurrency(summary.spent),
      formatCurrency(summary.remaining),
      <Box className={`status-chip ${statusClass}`}>
        {statusMessage}
      </Box>,
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <IconButton
          onClick={() => handleEdit(summary)}
          size="small"
          color="primary"
          title="Edit"
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          onClick={() => handleDelete(summary.category)}
          size="small"
          color="error"
          title="Delete"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>,
    ];
  });

  return (
    <Box className="budget-summary-container">
      <Box className="header-section">
        <Box className="title-container">
          <Typography variant="h5" component="h1">
            Budget Summary
          </Typography>
          <Typography className="subtitle" variant="body2">
            Total Budget: {formatCurrency(budgetSummary.reduce((sum, budget) => sum + budget.limit, 0))}
          </Typography>
        </Box>
        <Button
          onClick={() => setIsModalOpen(true)}
          type="button"
          text="Set Budget"
        />
      </Box>

      <Box className="content-wrapper">
        <Table 
          headers={headers}
          rows={rows}
          emptyMessage="No budgets set. Click 'Set Budget' to get started."
        />
      </Box>

      <Modal
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      >
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6" component="h2">
            {selectedBudget ? 'Edit Budget' : 'Set Budget'}
          </Typography>
          {error && <Box sx={{ color: 'error.main', mb: 2 }}>{error}</Box>}
          <BudgetForm 
            onSubmit={handleSetBudget} 
            categories={categories} 
            initialData={selectedBudget ? { category: selectedBudget.category, limit: selectedBudget.limit.toString() } : undefined}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default BudgetSummary;