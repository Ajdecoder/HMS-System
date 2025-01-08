import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Patient from "./models/Patient.js";
import { User } from "./models/User.js";
import bcrypt from "bcrypt";
import DietChart from "./models/DietChart.js";

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

// Connect to MongoDB
mongoose
  .connect(process.env.LOCALDB_URI || process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

app.get("/", (req, res) => {
  res.send("Hospital Food Manager API");
});

// Authentication Middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
// Auth Register

app.post("/auth/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const ExistingUser = await User.findOne({ email });

  if (ExistingUser)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPassword, role });
  await user.save();

  const payload = { name: user.name, email: user.email, role: user.role };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }); // Generate JWT

  res
    .status(200)
    .json({ message: "User has been registered successfully", token });
});

// Auth Login
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(404).json({ message: "Password or UserName not match" });
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    }); // Generate JWT

    res.status(200).json({ message: "Login successfull", token });
  } catch (error) {
    console.log(error.message);
  }
});

// API Endpoints

// Patient CRUD
app.post("/patients", authenticate, async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/patients", authenticate, async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/patients/:id", authenticate, async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/patients/:id", authenticate, async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Diet Chart CRUD
app.post("/diet-charts", authenticate, async (req, res) => {
  try {
    const dietChart = new DietChart(req.body);
    await dietChart.save();
    res.status(201).json(dietChart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/diet-charts", authenticate, async (req, res) => {
  try {
    const dietCharts = await DietChart.find().populate("patientId");
    res.json(dietCharts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add other CRUD operations as needed...

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
