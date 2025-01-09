const mongoose = require('mongoose');

const taskTrackingSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  mealType: {
    type: String,
    enum: ['Morning', 'Evening', 'Night'],
    required: true,
  },
  preparationStatus: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  deliveryStatus: {
    type: String,
    enum: ['Pending', 'Delivered'],
    default: 'Pending',
  },
  deliveryPersonnel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeliveryPersonnel',
  },
  pantryStaff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PantryStaff',
  },
  deliveryTime: Date, // When the meal is delivered
  preparationTime: Date, // When the meal preparation was completed
});

const TaskTracking = mongoose.model('TaskTracking', taskTrackingSchema);

export default TaskTracking;
