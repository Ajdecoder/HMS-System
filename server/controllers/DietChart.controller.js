import DietChart from "../models/DietChart.js";
import Patient from "../models/Patient.js";

// DietChart Management
export const createDietChart = async (req, res) => {
  try {
    const newDietChart = new DietChart(req.body);
    await newDietChart.save();
    res.status(201).json(newDietChart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDietChartByPatientId = async (req, res) => {
  try {
    const dietChart = await DietChart.findOne({
      patientId: req.params.patientId,
    });
    if (!dietChart)
      return res.status(404).json({ message: "Diet chart not found" });
    res.json(dietChart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDietChartById = async (req, res) => {
  try {
    const updatedDietChart = await DietChart.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDietChart)
      return res.status(404).json({ message: "Diet chart not found" });
    res.json(updatedDietChart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDietChartById = async (req, res) => {
  try {
    const deletedDietChart = await DietChart.findByIdAndDelete(req.params.id);
    if (!deletedDietChart)
      return res.status(404).json({ message: "Diet chart not found" });
    res.json({ message: "Diet chart deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllDietChart = async (req, res) => {
  try {
    const dietCharts = await DietChart.find().populate('patientId');
    res.status(200).json(dietCharts);
  } catch (error) {
    console.error("Error fetching diet charts:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

