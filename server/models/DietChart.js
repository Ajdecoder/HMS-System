  import mongoose from "mongoose";

  const dietChartSchema = new mongoose.Schema({
    patientId: mongoose.Schema.Types.ObjectId,
    morning: String,
    evening: String,
    night: String,
    instructions: String,
  });

  const DietChart = mongoose.model('DietChart', dietChartSchema);

  export default DietChart;
