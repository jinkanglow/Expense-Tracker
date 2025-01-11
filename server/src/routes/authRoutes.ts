import { Router } from "express";
import { login, register, updateUser } from "../controllers/authController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

// Add proper type annotations
router.post("/register", register);
router.post("/login", login);
router.put("/update/:id", authenticateToken, updateUser);

export default router;
