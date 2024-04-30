const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  planting: {
    type: String,
    required: true,
    trim: true,
  },
  fertilizing: {
    type: String,
    required: true,
    trim: true,
  },
  pruning: {
    type: String,
    required: true,
    trim: true,
  },
  watering: {
    type: String,
    required: true,
    trim: true,
  }
});

const Task = model('Task', taskSchema);

module.exports = Task;
