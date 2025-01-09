import express from "express";
import {
  createPatient,
  getPatientById,
  updatePatientById,
  deletePatientById,
  getAllPatient,
} from "../controllers/Patient.controller.js";
import {
  createDietChart,
  deleteDietChartById,
  getAllDietChart,
  getDietChartByPatientId,
  updateDietChartById,
} from "../controllers/DietChart.controller.js";
import {
  addPantryStaff,
  deletePantryStaffById,
  getAllPantryStaff,
  getPantryStaffById,
  updatePantryStaffById,
} from "../controllers/Pantry.controller.js";
import {
  assignMealDelivery,
  getAllMealDelivery,
  getMealDeliveryById,
  updateMealDeliveryById,
} from "../controllers/MealDelivery.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/patients", authenticate, createPatient);
router.get("/patients", authenticate, getAllPatient);
router.get("/patients/:id", authenticate, getPatientById);
router.put("/patients/:id", authenticate, updatePatientById);
router.delete("/patients/:id", authenticate, deletePatientById);

router.post("/diet-charts", authenticate, createDietChart);
router.get("/diet-charts", authenticate, getAllDietChart);
router.get("/diet-charts/:patientId", authenticate, getDietChartByPatientId);
router.put("/diet-charts/:id", authenticate, updateDietChartById);
router.delete("/diet-charts/:id", authenticate, deleteDietChartById);

router.post("/pantry", authenticate, addPantryStaff);
router.get("/pantry", authenticate, getAllPantryStaff);
router.get("/pantry/:id", authenticate, getPantryStaffById);
router.put("/pantry/:id", authenticate, updatePantryStaffById);
router.delete("/pantry/:id", authenticate, deletePantryStaffById);

router.post("/meal-deliveries", authenticate, assignMealDelivery);
router.get("/meal-deliveries", authenticate, getAllMealDelivery);
router.get("/meal-deliveries/:id", authenticate, getMealDeliveryById);
router.put("/meal-deliveries/:id", authenticate, updateMealDeliveryById);

export default router;
