import React from 'react';
import { useApi } from '../hooks/useApi';
import { getExpenseList } from '../services/api';
import ExpenseChartDisplay from '../components/chart/ExpenseChartDisplay';

interface Expense {
  id: string;
  amount: number;
  category: string;
  date: Date;
  description: string;
  note: string;
}

const ExpenseChart: React.FC = () => {
  const { data: expenses, loading, error } = useApi<Expense[]>(getExpenseList);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return <ExpenseChartDisplay expenses={expenses || []} />;
};

export default ExpenseChart;
