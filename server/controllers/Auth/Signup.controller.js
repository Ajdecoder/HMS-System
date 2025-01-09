import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

import { User } from "../../models/User.js";

export const Signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const ExistingUser = await User.findOne({ email });

    if (ExistingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    const payload = { name: user.name, email: user.email, role: user.role };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    }); // Generate JWT

    res
      .status(200)
      .json({ message: "User has been registered successfully", token });
  } catch (error) {

    res.status(500).json({ message:error.message})

  }
};
