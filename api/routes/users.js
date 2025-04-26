import express from "express";
import db from "../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();
import dotenv from "dotenv";
dotenv.config();

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  await db.read();
  const user = db.data.users.find((user) => user.email === email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  if (!user.isActive) {
    return res.status(403).json({ message: "User is inactive" });
  }

  const token = jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_KEY,
    {
      expiresIn: "1h",
    }
  );

  res.cookie("authToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.send({ message: "Login successful" });
});

router.post("/logout", (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Logged out" });
});

export default router;
