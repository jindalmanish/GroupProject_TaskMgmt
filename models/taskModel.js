const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskTitle: { type: String, required: true },
  taskDetails: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  status: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Task', taskSchema);