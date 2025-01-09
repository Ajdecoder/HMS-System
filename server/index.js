import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Login } from "./controllers/Auth/Login.controller.js";
import { Signup } from "./controllers/Auth/Signup.controller.js";
import router from "./routes/ApiRoutes.routes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 6010;

// Middleware
app.use(
  cors({
    origin: process.env.CORS_PORT || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use('/api/v1/', router)

// Connect to MongoDB
mongoose
  .connect(process.env.LOCALDB_URI || process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

app.get("/", (req, res) => {
  res.status(2001).send("Hospital Food Manager API");
});

app.post("/auth/register", Signup)
app.post("/auth/login", Login)


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
