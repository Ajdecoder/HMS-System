import MealDelivery from "../models/Delivery.js";
import Patient from "../models/Patient.js";

// MealDelivery Management
export const assignMealDelivery = async (req, res) => {
  try {
    const newMealDelivery = new MealDelivery(req.body);
    await newMealDelivery.save();
    res.status(201).json(newMealDelivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllMealDelivery = async (req,res) => {
  try {
    const deliveries = await MealDelivery.find();
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ error: error.message } );
  }
};

export const getMealDeliveryById = async (req, res) => {
  try {
    const mealDelivery = await MealDelivery.findById(req.params.id);
    if (!mealDelivery) return res.status(404).json({ message: "Meal delivery not found" });
    res.json(mealDelivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMealDeliveryById = async (req, res) => {
  try {
    const updatedMealDelivery = await MealDelivery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMealDelivery) return res.status(404).json({ message: "Meal delivery not found" });
    res.json(updatedMealDelivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ...
export const deleteMealDeliveryById = async (req, res) => {
  try {
    const deletedMealDelivery = await MealDelivery.findByIdAndDelete(req.params.id);
    if (!deletedMealDelivery) return res.status(404).json({ message: "Meal delivery not found" });
    res.json({ message: "Meal delivery deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};