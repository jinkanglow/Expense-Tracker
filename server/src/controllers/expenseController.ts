import Expense from "../models/Expense";
import { Request, Response } from "express";

export const addExpense = async (req: Request, res: Response) => {
  const { amount, description, date, category, note } = req.body;
  try {
    const newExpense = new Expense({
      userId: req.body.user.userId,
      amount,
      description,
      date,
      category,
      note,
    });
    await newExpense.save();
    res.status(201).json({ message: "Expense added successfully" });
  } catch (error) {
    res.status(400).json({
      message: "Error adding expense",
      error: (error as Error).message,
    });
  }
};

export const getExpenseList = async (req: Request, res: Response) => {
  try {
    console.log("User ID:", req.body.user);
    const expenses = await Expense.find({ userId: req.body.user.userId });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching expenses",
      error: (error as Error).message,
    });
  }
};

export const updateExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          amount: req.body.amount,
          description: req.body.description,
          date: req.body.date,
          category: req.body.category,
          note: req.body.note,
        },
      },
      { new: true }
    );

    if (!updatedExpense) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }
    res.status(200).json(updatedExpense);
  } catch (error) {
    console.error("Update error:", error); // Add this for debugging
    res.status(400).json({ message: "Error updating expense" });
  }
};

export const deleteExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await Expense.findByIdAndDelete(req.params.id);

    if (!result) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error); // Add this for debugging
    res.status(400).json({ message: "Error deleting expense" });
  }
};
