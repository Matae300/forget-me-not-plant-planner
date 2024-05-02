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
  },
  careSchedule: {
      frequency_count: {
        type: Number,
      },
      frequency_unit:{
        type: Array,
      },
      frequency_interval: {
        type: Number,
      }
      }
});

const Task = model('Task', taskSchema);

module.exports = Task;
