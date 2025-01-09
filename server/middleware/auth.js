import dotenv from 'dotenv'
// Load environment variables
dotenv.config();

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    console.log(user)
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};