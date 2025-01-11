import { Router } from "express";
import {
  setBudget,
  getBudgets,
  getBudgetSummary,
  deleteBudget,
  updateBudget,
} from "../controllers/budgetController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/set", authenticateToken, setBudget);
router.get("/budgetlist", authenticateToken, getBudgets);
router.get("/budgetsummary", authenticateToken, getBudgetSummary);
router.delete("/delete/:category", authenticateToken, deleteBudget);
router.put("/update/:category", authenticateToken, updateBudget);

export default router;