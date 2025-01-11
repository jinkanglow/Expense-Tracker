import { Router } from "express";
import { getExpenseData, getBudgetData } from "../controllers/dashboardController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/expenses", authenticateToken, getExpenseData);
router.get("/budgets", authenticateToken, getBudgetData);

export default router;