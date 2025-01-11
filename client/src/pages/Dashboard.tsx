import React, { useEffect, useState } from 'react';
import {
  FaWallet,
  FaChartPie,
  FaChartLine,
  FaDownload,
  FaPlus,
} from 'react-icons/fa';
import BudgetChartDisplay from '../components/chart/BudgetChartDisplay';
import ExpenseChartDisplay from '../components/chart/ExpenseChartDisplay';
import { getExpenseData, getBudgetData, addExpense } from '../services/api';
import '../styles/pages/Dashboard.scss';
import { Modal, Box, Typography, Snackbar, Alert } from '@mui/material';
import AddExpenseForm from './AddExpenseForm';
import { useNavigate } from 'react-router-dom';
import Button from '../components/shared/Button/Button';

// Import and register Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const [totalExpenses, setTotalExpenses] = useState<number | null>(null);
  const [budgetStatus, setBudgetStatus] = useState<number | null>(null);
  const [monthlyTrend, setMonthlyTrend] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { categories, amounts } = await getExpenseData();
        const total = amounts.reduce((sum, amount) => sum + amount, 0);
        setTotalExpenses(total);

        const { limits, spent } = await getBudgetData();
        const totalBudget = limits.reduce((sum, limit) => sum + limit, 0);
        const totalSpent = spent.reduce((sum, amount) => sum + amount, 0);
        setBudgetStatus(totalBudget - totalSpent);

        // Assuming monthly trend is the difference between this month and last month
        const lastMonthTotal = 0; // Fetch last month's total expenses if needed
        setMonthlyTrend(total - lastMonthTotal);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const showSnackbar = (
    message: string,
    severity: 'success' | 'error' = 'success'
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleExport = () => {
    const data = [
      ['Category', 'Amount'],
      ['Total Expenses', totalExpenses?.toFixed(2) || '0'],
      ['Budget Status', budgetStatus?.toFixed(2) || '0'],
      ['Monthly Trend', monthlyTrend?.toFixed(2) || '0'],
    ];

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      data.map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'expense_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showSnackbar('Data exported successfully', 'success');
  };

  const handleAddExpense = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleViewDetails = (path: string) => {
    navigate(path);
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
      await addExpense(expenseData);
      setIsModalOpen(false);
      // Optionally, you can refetch the data to update the dashboard
      const { categories, amounts } = await getExpenseData();
      const total = amounts.reduce((sum, amount) => sum + amount, 0);
      setTotalExpenses(total);
      showSnackbar('Expense added successfully', 'success');
    } catch (error) {
      console.error('Error adding expense:', error);
      showSnackbar('Error adding expense', 'error');
    }
  };

  return (
    <div className="dashboard">
      <div className="container">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Financial Dashboard</h1>
            <p className="subtitle">Track your expenses and budget</p>
          </div>
          <div className="header-actions">
            <Button
              text="Export"
              startIcon={<FaDownload />}
              onClick={handleExport}
            />
            <Button
              text="Add Expense"
              startIcon={<FaPlus />}
              onClick={handleAddExpense}
            />
          </div>
        </div>

        {/* Overview Cards */}
        <div className="overview-cards">
          <div className="overview-card">
            <div className="card-icon expenses">
              <FaWallet />
            </div>
            <div className="card-content">
              <h3>Total Expenses</h3>
              <div className="card-value">
                {totalExpenses !== null ? `$${totalExpenses.toFixed(2)}` : 'Loading...'}
              </div>
              <div className="card-subtitle">vs. last month</div>
            </div>
          </div>

          <div className="overview-card">
            <div className="card-icon budget">
              <FaChartPie />
            </div>
            <div className="card-content">
              <h3>Budget Status</h3>
              <div className="card-value">
                {budgetStatus !== null ? `$${budgetStatus.toFixed(2)}` : 'Loading...'}
              </div>
              <div className="card-subtitle">remaining this month</div>
            </div>
          </div>

          <div className="overview-card">
            <div className="card-icon trend">
              <FaChartLine />
            </div>
            <div className="card-content">
              <h3>Monthly Trend</h3>
              <div className="card-value">
                {monthlyTrend !== null ? `$${monthlyTrend.toFixed(2)}` : 'Loading...'}
              </div>
              <div className="card-subtitle">month over month</div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <div className="header-title">
                <h2>Budget</h2>
                <Button
                  text="View Details"
                  onClick={() => handleViewDetails('/budgets')}
                />
              </div>
            </div>
            <div className="chart-container">
              <BudgetChartDisplay />
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <div className="header-title">
                <h2>Expense</h2>
                <Button
                  text="View Details"
                  onClick={() => handleViewDetails('/expenses')}
                />
              </div>
            </div>
            <div className="chart-container">
              <ExpenseChartDisplay />
            </div>
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6" component="h2">
            Add New Expense
          </Typography>
          <AddExpenseForm onSubmit={handleFormSubmit} />
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default Dashboard;