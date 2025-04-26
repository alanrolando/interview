import express from "express";
import db from "../db.js";
import checkAuth from "../middleware/check-auth.js";
import cookieParser from "cookie-parser";

const router = express.Router();

router.use(cookieParser());
router.use(checkAuth);

router.get("/", async (req, res) => {
  const { id } = req.userData;

  await db.read();
  const user = db.data.users.find((u) => u._id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  delete user.password;
  delete user._id;
  delete user.guid;
  delete user.isActive;

  res.json(user);
});

router.patch("/", async (req, res) => {
  const { id } = req.userData;
  const updatedData = req.body;

  await db.read();
  const user = db.data.users.find((u) => u._id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!updatedData.password?.length) {
    delete updatedData.password;
  }

  for (const [key, value] of Object.entries(updatedData)) {
    if (user.hasOwnProperty(key)) {
      user[key] = value;
    }
  }

  await db.write();

  res.json({ message: "User data updated successfully" });
});

export default router;
