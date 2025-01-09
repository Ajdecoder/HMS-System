import express from "express";
import {
  createPatient,
  getPatientById,
  updatePatientById,
  deletePatientById,
  createDietChart,
  getDietChartByPatientId,
  updateDietChartById,
  deleteDietChartById,
  addPantryStaff,
  getPantryStaffById,
  updatePantryStaffById,
  deletePantryStaffById,
  assignMealDelivery,
  getMealDeliveryById,
  updateMealDeliveryById,
} from "./controllers";

const router = express.Router();

router.post("/patients", createPatient);
router.get("/patients/:id", getPatientById);
router.put("/patients/:id", updatePatientById);
router.delete("/patients/:id", deletePatientById);

router.post("/diet-charts", createDietChart);
router.get("/diet-charts/:patientId", getDietChartByPatientId);
router.put("/diet-charts/:id", updateDietChartById);
router.delete("/diet-charts/:id", deleteDietChartById);

router.post("/pantry", addPantryStaff);
router.get("/pantry/:id", getPantryStaffById);
router.put("/pantry/:id", updatePantryStaffById);
router.delete("/pantry/:id", deletePantryStaffById);

router.post("/meal-deliveries", assignMealDelivery);
router.get("/meal-deliveries/:id", getMealDeliveryById);
router.put("/meal-deliveries/:id", updateMealDeliveryById);

export default router;
