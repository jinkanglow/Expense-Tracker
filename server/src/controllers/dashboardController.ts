import { Request, Response } from "express";
import Budget from "../models/Budget";
import Expense from "../models/Expense";

export const getExpenseData = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body.user;
  try {
    const expenses = await Expense.find({ userId });
    const categories = [...new Set(expenses.map(expense => expense.category))];
    const amounts = categories.map(category => 
      expenses.filter(expense => expense.category === category)
              .reduce((sum, expense) => sum + expense.amount, 0)
    );

    res.status(200).json({ categories, amounts });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching expense data",
      error: (error as Error).message,
    });
  }
};

export const getBudgetData = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body.user;
  try {
    const budgets = await Budget.find({ userId });
    const expenses = await Expense.find({ userId });

    const categories = budgets.map(budget => budget.category);
    const limits = budgets.map(budget => budget.limit);
    const spent = categories.map(category => 
      expenses.filter(expense => expense.category === category)
              .reduce((sum, expense) => sum + expense.amount, 0)
    );
    const remaining = limits.map((limit, index) => limit - spent[index]);

    res.status(200).json({ categories, limits, spent, remaining });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching budget data",
      error: (error as Error).message,
    });
  }
};