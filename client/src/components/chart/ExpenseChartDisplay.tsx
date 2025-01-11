import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import { TooltipItem, ChartOptions } from 'chart.js';
import { getExpenseData } from '../../services/api';

interface Expense {
  amount: number;
  category: string;
  date: Date;
  description: string;
  note: string;
}

const ExpenseChartDisplay: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [startDate, setStartDate] = useState(moment().startOf('month'));
  const [endDate, setEndDate] = useState(moment().endOf('month'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { categories, amounts } = await getExpenseData();
        const fetchedExpenses = categories.map((category, index) => ({
          amount: amounts[index],
          category,
          date: new Date(), // Assuming the date is the current date for simplicity
          description: '',
          note: '',
        }));
        setExpenses(fetchedExpenses);
        setFilteredExpenses(fetchedExpenses);
      } catch (error) {
        console.error('Error fetching expense data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'startDate') {
      const newStartDate = moment(value).startOf('day');
      setStartDate(newStartDate);
      filterExpenses(newStartDate, endDate);
    } else if (name === 'endDate') {
      const newEndDate = moment(value).endOf('day');
      setEndDate(newEndDate);
      filterExpenses(startDate, newEndDate);
    }
  };

  const filterExpenses = (start: moment.Moment, end: moment.Moment) => {
    const filtered = expenses.filter((expense) => {
      const expenseDate = moment(expense.date);
      return expenseDate.isBetween(start, end, 'day', '[]');
    });
    setFilteredExpenses(filtered);
  };

  const categories = [...new Set(filteredExpenses.map((expense) => expense.category))];
  const amounts = categories.map((category) =>
    filteredExpenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0)
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses',
        data: amounts,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}`
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'bar'>) => {
            const value = tooltipItem.raw as number;
            return `$${value.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h2>Expense Analysis</h2>
        <div className="date-range">
          <div className="input-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate.format('YYYY-MM-DD')}
              onChange={handleMonthChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate.format('YYYY-MM-DD')}
              onChange={handleMonthChange}
            />
          </div>
        </div>
      </div>
      
      <div className="chart-wrapper">
        <Bar data={data} options={options} />
      </div>
      
      <div className="transactions-section">
        <h3>Recent Transactions</h3>
        <div className="transactions-list">
          {filteredExpenses.map((expense, index) => (
            <div key={index} className="transaction-item">
              <div className="transaction-icon">
                <span className="category-icon">{expense.category[0]}</span>
              </div>
              <div className="transaction-details">
                <div className="transaction-main">
                  <span className="category">{expense.category}</span>
                  <span className="amount">${expense.amount.toFixed(2)}</span>
                </div>
                <div className="transaction-sub">
                  <span className="date">
                    {moment(expense.date).format('MMM DD, YYYY')}
                  </span>
                  {expense.description && (
                    <span className="description">{expense.description}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseChartDisplay;