import React from 'react';
import { useApi } from '../hooks/useApi';
import { getBudget } from '../services/api';
import BudgetChartDisplay from '../components/chart/BudgetChartDisplay';

interface Summary {
  category: string;
  limit: number;
  spent: number;
  remaining: number;
  month: Date;
}

interface BudgetChartProps {
  userId: string;
}

const BudgetChart: React.FC<BudgetChartProps> = ({ userId }) => {
  const {
    data: summary,
    loading,
    error,
  } = useApi<Summary[]>(() => getBudget(userId));

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  // Ensure summary is not null before rendering
  const validSummary = summary ? summary : [];

  return <BudgetChartDisplay summary={validSummary} />;
};

export default BudgetChart;
