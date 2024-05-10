const { Schema, model } = require('mongoose');

const wateringTaskSchema = new Schema({
  instructions: {
    type: String,
    required: false,
    trim: true,
  },
   // The frequencyCount represents how many times the task should be performed
  frequencyCount: {
    type: Number,
    required: true,
    trim: true,
  },
   // The frequencyUnit represents the time unit for the frequency
  frequencyUnit: {
    type: String,
    required: true,
    trim: true,
  },
    // The frequencyInterval represents the number of time units that should pass between each task
  frequencyInterval: {
    type: Number,
    required: true,
    trim: true,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const plantSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  photoUrl: {
    type: String,
    required: false,
    trim: true,
  },
  sunExposure: {
    type: String, 
    required: false,
    trim: true,
  },
  growingMonths: {
    type: String, 
    required: false,
    trim: true,
  },
  bloomingMonths: {
    type: String,
    required: false,
    trim: true,
  },
  wateringTask: {
    type: wateringTaskSchema,
    required: true,
  },
  userNotes: [{
    name: {
      type: String,
      required: true,
    },
    noteName: {
      type: String,
      required: false,
      trim: true,
    },
    noteText: {
      type: String,
      required: false,
      trim: true,
    },
  }],
});

const Plant = model('Plant', plantSchema);

module.exports = Plant;