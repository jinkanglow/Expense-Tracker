import React, { useEffect, useState } from 'react';
import Form from '../components/shared/Form/Form';

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

interface Expense {
  _id: string;
  amount: number;
  description: string;
  date: Date;
  category: string;
  note: string;
}

interface AddExpenseFormProps {
  onSubmit: (data: Record<string, any>) => void;
  initialData?: Expense | null;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0], // Default to today's date
    category: '',
    note: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        amount: initialData.amount.toString(),
        description: initialData.description,
        date: initialData.date.toISOString().split('T')[0],
        category: initialData.category,
        note: initialData.note,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log('e.target', e.target);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log('Updated formData:', { ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const amount = Number(formData.amount);
    const date = new Date(formData.date);
    const description = formData.description;
    const category = formData.category;
    const note = formData.note;

    // Validate required fields
    if (!amount || !description || !date || !category) {
      alert('Please fill in all required fields.');
      return;
    }

    // Validate date
    if (isNaN(date.getTime())) {
      alert('Invalid date');
      return;
    }

    // Prepare the data to be sent to the server
    const expenseData = {
      amount,
      date: date.toISOString(), // Convert date to ISO string
      description,
      category,
      note,
    };

    // Call the onSubmit prop with the prepared data
    onSubmit(expenseData);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      inputs={[
        { name: 'amount', type: 'number', placeholder: 'Amount', required: true },
        { name: 'description', type: 'text', placeholder: 'Description', required: true },
        { name: 'date', type: 'date', placeholder: 'Date', required: true },
        {
          name: 'category',
          type: 'select',
          placeholder: 'Category',
          options: categories.map((category) => ({
            value: category,
            label: category,
          })),
          required: true,
        },
        { name: 'note', type: 'textarea', placeholder: 'Note' },
      ]}
      buttonText={initialData ? "Update Expense" : "Add Expense"}
      initialData={formData} // Pass initialData to Form component
      handleChange={handleChange} // Pass handleChange to Form component
    />
  );
};

export default AddExpenseForm;