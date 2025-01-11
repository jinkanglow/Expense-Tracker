import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import { getBudgetData } from '../../services/api';

interface Summary {
  category: string;
  limit: number;
  spent: number;
  remaining: number;
  month: Date;
}

const BudgetChartDisplay: React.FC = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [summary, setSummary] = useState<Summary[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { categories, limits, spent, remaining } = await getBudgetData();
        setSummary(categories.map((category, index) => ({
          category,
          limit: limits[index],
          spent: spent[index],
          remaining: remaining[index],
          month: new Date(), // Assuming the month is the current month for simplicity
        })));
      } catch (error) {
        console.error('Error fetching budget data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredSummary = summary.filter((item: Summary) =>
      moment(item.month).isSame(selectedMonth, 'month')
    );

    const categories = filteredSummary.map((item: Summary) => item.category);
    const limits = filteredSummary.map((item: Summary) => item.limit);
    const spent = filteredSummary.map((item: Summary) => item.spent);
    const remaining = filteredSummary.map((item: Summary) => item.remaining);

    setData({
      labels: categories,
      datasets: [
        {
          label: 'Limit',
          data: limits,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Spent',
          data: spent,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: 'Remaining',
          data: remaining,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    });
  }, [summary, selectedMonth]);

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
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
        <h2>Budget Overview</h2>
        <div className="date-filter">
          <label htmlFor="month-select">Select Month:</label>
          <input
            type="month"
            id="month-select"
            value={moment(selectedMonth).format('YYYY-MM')}
            onChange={(e) => setSelectedMonth(moment(e.target.value).toDate())}
          />
        </div>
      </div>
      <div className="chart-wrapper">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BudgetChartDisplay;