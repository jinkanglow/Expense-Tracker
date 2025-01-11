import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Modal,
  Typography,
  IconButton,
  Alert,
  Snackbar,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '../components/shared/Table/Table';
import Loader from '../components/shared/Loader/Loader';
import Button from '../components/shared/Button/Button';

import {
  getExpenseList,
  addExpense,
  deleteExpense,
  updateExpense,
} from '../services/api';
import AddExpenseForm from './AddExpenseForm';
import '../styles/pages/ExpenseList.scss';

interface Expense {
  _id: string;
  amount: number;
  description: string;
  date: Date;
  category: string;
  note: string;
}

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

const ExpenseList: React.FC = () => {
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const showSnackbar = (
    message: string,
    severity: 'success' | 'error' = 'success'
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const fetchExpenseList = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getExpenseList();
      setExpenseList(
        data.map((expense: Expense) => ({
          ...expense,
          date: new Date(expense.date),
        }))
      );
    } catch (err: unknown) {
      const error = err as Error;
      showSnackbar(error.message || 'Error fetching expenses', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenseList();
  }, [fetchExpenseList]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await deleteExpense(id);
        fetchExpenseList();
        showSnackbar('Expense deleted successfully');
      } catch (err: unknown) {
        const error = err as Error;
        showSnackbar(error.message || 'Error deleting expense', 'error');
      }
    }
  };

  const handleOpenModal = (expense?: Expense) => {
    if (expense) {
      setSelectedExpense(expense);
    } else {
      setSelectedExpense(null);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedExpense(null);
  };

  const handleFormSubmit = async (data: Record<string, any>) => {
    try {
      const expenseData = {
        amount: Number(data.amount),
        description: data.description,
        date: new Date(data.date),
        category: data.category,
        note: data.note,
      };
      if (selectedExpense && selectedExpense._id) {
        await updateExpense(selectedExpense._id, expenseData);
        showSnackbar('Expense updated successfully');
      } else {
        await addExpense(expenseData);
        showSnackbar('Expense added successfully');
      }
      handleCloseModal();
      fetchExpenseList();
    } catch (err: unknown) {
      const error = err as Error;
      showSnackbar(error.message || 'Error saving expense', 'error');
    }
  };

  const rows = expenseList.map((expense) => [
    `$${expense.amount.toFixed(2)}`,
    expense.description,
    new Date(expense.date).toLocaleDateString(),
    <Chip
      key={expense._id}
      label={expense.category}
      className={`category-chip ${expense.category
        .toLowerCase()
        .replace(/[& ]/g, '')}`}
    />,
    expense.note || '-',
    <Box
      key={expense._id}
      sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}
    >
      <IconButton
        onClick={() => handleOpenModal(expense)}
        size="small"
        color="primary"
        title="Edit"
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        onClick={() => handleDelete(expense._id)}
        size="small"
        color="error"
        title="Delete"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>,
  ]);

  if (isLoading) return <Loader />;

  return (
    <Box className="expense-list-container">
      <Box className="header-section">
        <Box className="title-container">
          <Typography variant="h5" component="h1">
            Expense List
          </Typography>
          <Typography className="subtitle" variant="body2">
            Total Expenses: $
            {expenseList.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
          </Typography>
        </Box>
        <Button
          onClick={() => handleOpenModal()}
          text="Add Expense"
          startIcon={<AddIcon />}
          className="add-button"
        />
      </Box>

      <Box className="content-wrapper">
        <Table
          headers={[
            'Amount',
            'Description',
            'Date',
            'Category',
            'Note',
            'Actions',
          ]}
          rows={rows}
          emptyMessage="No expenses recorded yet. Click 'Add Expense' to get started!"
        />
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
      >
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6" component="h2">
            {selectedExpense ? 'Edit Expense' : 'Add New Expense'}
          </Typography>
          <AddExpenseForm
            onSubmit={handleFormSubmit}
            initialData={selectedExpense}
          />
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ExpenseList;