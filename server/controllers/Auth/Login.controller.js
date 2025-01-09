
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose';
import { User } from '../../models/User.js';
import dotenv from 'dotenv'

dotenv.config()

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(404).json({ message: "Invalid Credentials " });
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,    
      role: user.role,
    };

    console.log(process.env.JWT_SECRET)
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    }); // Generate JWT

    res.status(200).json({ message: "Login successfull", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}