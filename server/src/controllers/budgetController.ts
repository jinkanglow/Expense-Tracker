import Budget from "../models/Budget";
import { Request, Response } from "express";
import Expense from "../models/Expense";

export const setBudget = async (req: Request, res: Response) => {
  const { category, limit } = req.body;
  try {
    const newBudget = new Budget({
      userId: req.body.user.userId,
      category,
      limit,
    });
    await newBudget.save();
    res.status(201).json({ message: "Budget set successfully" });
  } catch (error) {
    res.status(400).json({
      message: "Error setting budget",
      error: (error as Error).message,
    });
  }
};

export const getBudgets = async (req: Request, res: Response) => {
  const { userId } = req.body.user;
  try {
    const budgets = await Budget.find({ userId });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching budget",
      error: (error as Error).message,
    });
  }
};

export const getBudgetSummary = async (req: Request, res: Response) => {
  const { userId } = req.body.user;
  try {
    const expenses = await Expense.find({ userId });
    const budgets = await Budget.find({ userId });

    const summary = budgets.map((budget) => {
      const totalSpent = expenses
        .filter((expense) => expense.category === budget.category)
        .reduce((sum, expense) => sum + expense.amount, 0);
      return {
        category: budget.category,
        limit: budget.limit,
        spent: totalSpent,
        remaining: budget.limit - totalSpent,
      };
    });
    res.status(200).json(summary);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching budget summary",
      error: (error as Error).message,
    });
  }
};

export const deleteBudget = async (req: Request, res: Response) => {
  const { category } = req.params;
  const { userId } = req.body.user;
  try {
    await Budget.findOneAndDelete({ userId, category });
    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(400).json({
      message: "Error deleting budget",
      error: (error as Error).message,
    });
  }
};

export const updateBudget = async (req: Request, res: Response) => {
  const { category } = req.params;
  const { limit } = req.body;
  const { userId } = req.body.user;
  try {
    const budget = await Budget.findOneAndUpdate(
      { userId, category },
      { limit },
      { new: true }
    );
    if (!budget) {
       res.status(404).json({ message: "Budget not found" });
    }
    res.status(200).json({ message: "Budget updated successfully", budget });
  } catch (error) {
    res.status(400).json({
      message: "Error updating budget",
      error: (error as Error).message,
    });
  }
};