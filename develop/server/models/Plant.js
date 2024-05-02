const { Schema, model } = require('mongoose');

const plantSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  // URL to image of plant
  image: {
    type: String,
    required: true,
    trim: true,
  },
  wateringInstructions: {
    type: String,
    required: true,
    trim: true,
  },
  sunExposure: {
    type: String,
    required: true,
    trim: true,
  },
  growingMonths: {
    type: String,
    required: true,
    trim: true,
  },
  bloomSeason: {
    type: String,
    required: true,
    trim: true,
  },
  plantingInstructions: {
    type: String,
    required: true,
    trim: true,
  },
  spacing: {
    type: String,
    required: true,
    trim: true,
  },
 fertilizingInstructions: {
    type: String,
    required: true,
    trim: true,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

const Plant = model('Plant', plantSchema);

module.exports = Plant;
