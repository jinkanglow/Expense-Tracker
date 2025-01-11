import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Add this to handle cookies/credentials
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request:', {
      url: config.url,
      method: config.method,
      data: config.data,
    });
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject(error.request.data);
    } else {
      return Promise.reject({ message: error.message });
    }
  }
);

export const registerUser = async (
  username: string,
  password: string,
  email: string
) => {
  try {
    console.log('Attempting registration:', { username, email }); // Debug log
    const response = await axiosInstance.post('/auth/register', {
      username,
      password,
      email,
    });
    console.log('Registration response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Registration error:', error); // Debug log
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Registration failed');
      } else if (error.request) {
        throw new Error('Server not responding. Please try again later.');
      }
    }
    throw new Error('Registration failed. Please try again.');
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    console.log('Login attempt for:', username);
    const response = await axiosInstance.post('/auth/login', {
      username,
      password,
    });

    if (response.data.token) {
      // Store the token
      localStorage.setItem('token', response.data.token);
      // Store user info
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    console.error('Login error full details:', error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Login failed');
      } else if (error.request) {
        throw new Error(
          'Server not responding. Please check if the server is running.'
        );
      }
    }
    throw new Error('Login failed. Please try again.');
  }
};

export const updateUser = async (
  id: string,
  username: string,
  password: string,
  email: string
) => {
  try {
    const response = await axiosInstance.put(`/update/${id}`, {
      username,
      password,
      email,
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const addExpense = async (expenseData: {
  amount: number;
  date: Date;
  description: string;
  category: string;
  note: string;
}) => {
  try {
    const response = await axiosInstance.post('/expenses/add', expenseData);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getExpenseList = async () => {
  try {
    const response = await axiosInstance.get('/expenses/list');
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const updateExpense = async (
  id: string,
  expenseData: {
    amount: number;
    date: Date;
    description: string;
    category: string;
    note: string;
  }
) => {
  try {
    const response = await axiosInstance.put(
      `/expenses/update/${id}`,
      expenseData
    );
    return response.data;
  } catch (error) {
    console.error('Update expense error:', error);
    throw error;
  }
};

export const deleteExpense = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/expenses/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Delete expense error:', error);
    throw error;
  }
};

export const setBudget = async (category: string, limit: number) => {
  try {
    const response = await axiosInstance.post('/budgets/set', {
      category,
      limit,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to set budget');
      } else if (error.request) {
        throw new Error('Server not responding. Please try again later.');
      }
    }
    throw new Error('Failed to set budget. Please try again.');
  }
};

export const deleteBudget = async (category: string) => {
  try {
    const response = await axiosInstance.delete(`/budgets/delete/${category}`);
    return response.data;
  } catch (error) {
    console.error('Delete budget error:', error);
    throw error;
  }
};

export const updateBudget = async (category: string, limit: number) => {
  try {
    const response = await axiosInstance.put(`/budgets/update/${category}`, {
      limit,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to update budget');
      } else if (error.request) {
        throw new Error('Server not responding. Please try again later.');
      }
    }
    throw new Error('Failed to update budget. Please try again.');
  }
};

export const getBudgets = async () => {
  try {
    const response = await axiosInstance.get('/budgets/budgetlist');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data.message || 'Failed to fetch budgets'
        );
      } else if (error.request) {
        throw new Error('Server not responding. Please try again later.');
      }
    }
    throw new Error('Failed to fetch budgets. Please try again.');
  }
};



export const getExpenseData = async () => {
  try {
    const response = await axiosInstance.get('/dashboard/expenses');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data.message || 'Failed to fetch expense data'
        );
      } else if (error.request) {
        throw new Error('Server not responding. Please try again later.');
      }
    }
    throw new Error('Failed to fetch expense data. Please try again.');
  }
};

export const getBudgetData = async () => {
  try {
    const response = await axiosInstance.get('/dashboard/budgets');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data.message || 'Failed to fetch budget data'
        );
      } else if (error.request) {
        throw new Error('Server not responding. Please try again later.');
      }
    }
    throw new Error('Failed to fetch budget data. Please try again.');
  }
};

// Existing functions...

export const getBudgetSummary = async () => {
  try {
    const response = await axiosInstance.get('/budgets/budgetsummary');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data.message || 'Failed to fetch budget summary'
        );
      } else if (error.request) {
        throw new Error('Server not responding. Please try again later.');
      }
    }
    throw new Error('Failed to fetch budget summary. Please try again.');
  }
};