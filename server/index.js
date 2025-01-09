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
import { authenticate } from "./middleware/auth.js";
import { Login } from "./controllers/Auth/Login.controller.js";

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


// Auth Register

app.post("/auth/register", Login)

// Auth Login
app.post("/auth/login", async (req, res) => {
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
