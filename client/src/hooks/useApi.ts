import { useState, useEffect } from 'react';
import * as api from '@services/api';

// Define return types for each API call
interface Expense {
  id: string;
  amount: number;
  date: Date;
  description: string;
  category: string;
  note: string;
}

interface Budget {
  category: string;
  limit: number;
}

interface BudgetSummary {
  category: string;
  spent: number;
  limit: number;
  remaining: number;
}

// Define the API function types
type ApiFunction<T> = () => Promise<T>;

export const useApi = <T>(apiFunction: ApiFunction<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await apiFunction();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiFunction]);

  return { data, loading, error };
};

// Only include hooks for GET operations that need loading states
export const useFetchExpenses = () => {
  return useApi<Expense[]>(() => api.getExpenseList());
};

export const useBudgets = (userId: string) => {
  return useApi<Budget[]>(() => api.getBudget(userId));
};

export const useBudgetSummary = (userId: string) => {
  return useApi<BudgetSummary[]>(() => api.getBudgetSummary(userId));
};
