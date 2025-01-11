import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, email } = req.body;

    // Add validation
    if (!username || !password || !email) {
      res.status(400).json({
        message: "All fields are required",
      });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      res.status(400).json({
        message: "Username or email already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({
      message: "Error registering user",
      error: (error as Error).message,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }

    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Error during login",
      error: (error as Error).message,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    user.username = username;
    user.password = password;
    user.email = email;
    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(400).json({
      message: "Error updating user",
      error: (error as Error).message,
    });
  }
};
