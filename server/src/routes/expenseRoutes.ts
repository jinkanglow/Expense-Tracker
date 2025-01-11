import { Router } from "express";
import {
  addExpense,
  getExpenseList,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/add", authenticateToken, addExpense);
router.get("/list", authenticateToken, getExpenseList);
router.put("/update/:id", authenticateToken, updateExpense);
router.delete("/delete/:id", authenticateToken, deleteExpense);

export default router;
