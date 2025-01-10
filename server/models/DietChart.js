import mongoose from "mongoose";

const dietChartSchema = new mongoose.Schema({
  patientId: { type: String, ref: 'Patient',  required: true, },
  morning: {
    meal: String,  
    ingredients: [String],  
  },

  evening: {
    meal: String,
    ingredients: [String],
  },
  night: {
    meal: String,
    ingredients: [String],
  },
  instructions: String,  
});

const DietChart = mongoose.model('DietChart', dietChartSchema);

export default DietChart;
