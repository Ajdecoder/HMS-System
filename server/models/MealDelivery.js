import mongoose from "mongoose";

const mealDeliverySchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient", 
    required: true,
  },
  foodManagerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FoodManager", 
    required: true,
  },
  pantryStaffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PantryStaff", 
    required: true,
  },
  deliveryPersonnelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryPersonnel", 
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
