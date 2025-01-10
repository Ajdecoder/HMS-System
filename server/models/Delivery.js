import mongoose from "mongoose";

const mealDeliverySchema = new mongoose.Schema({
  patientId: {
    type: String,
    ref: "Patient",
    required: true,
  },
  pantryStaffId: {
    type: String,
    ref: "PantryStaff",
    required: true,
  },
  mealType: {
    type: String,
    enum: ["morning", "evening", "night"],
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  preparationStatus: {
    type: String,
    enum: ["not started", "in progress", "completed"],
    default: "not started",
  },
  deliveryStatus: {
    type: String,
    enum: ["pending", "delivered"],
    default: "pending",
  },
  deliveryTime: {
    type: Date,
  },
  deliveryNotes: {
    type: String,
    default: "",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const MealDelivery = mongoose.model("MealDelivery", mealDeliverySchema);

export default MealDelivery;
