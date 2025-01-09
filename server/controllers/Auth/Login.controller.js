
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose';

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

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: Date.now() + 3600 * 24 * 1000,
    }); // Generate JWT

    res.status(200).json({ message: "Login successfull", token });
  } catch (error) {
    console.log(error.message);
  }
}