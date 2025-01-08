import mongoose from "mongoose";

const mealDeliverySchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient", // Referencing Patient schema
    required: true,
  },
  foodManagerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FoodManager", // Referencing Food Manager schema
    required: true,
  },
  pantryStaffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PantryStaff", // Referencing Pantry Staff schema
    required: true,
  },
  deliveryPersonnelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryPersonnel", // Referencing Delivery Personnel schema
    required: true,
  },
  mealType: {
    type: String,
    enum: ["morning", "evening", "night"], // Meal types
    required: true,
  },
  ingredients: {
    type: [String], // List of ingredients for the meal
    required: true,
  },
  preparationStatus: {
    type: String,
    enum: ["not started", "in progress", "completed"], // Status of meal preparation
    default: "not started",
  },
  deliveryStatus: {
    type: String,
    enum: ["pending", "delivered"], // Delivery status
    default: "pending",
  },
  deliveryTime: {
    type: Date,
  },
  deliveryNotes: {
    type: String,
    default: "", // Optional notes for delivery
  },
  timestamp: {
    type: Date,
    default: Date.now, // Timestamp for when the delivery was logged
  },
});

const MealDelivery = mongoose.model("MealDelivery", mealDeliverySchema);

export default MealDelivery;
