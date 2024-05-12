const { Schema, model, mongoose } = require('mongoose');
const { calculateDueDatesUntilOneYear } = require('../utils/helpers');

const wateringTaskSchema = new Schema({
  instructions: {
    type: String,
    required: true,
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
  createdDates: [{
    _id: {
      type: Schema.Types.ObjectId,
    },
    date: {
      type: String,
    },
    isChecked: {
      type: Boolean,
    }
  }]
});

const plantSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
  otherTasks: [{
    taskName: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    dates: [
      {
        type: String,
        required: true
      }
    ]
  }],
  userNotes: {
    noteName: {
      type: String,
      required: false,
    },
    noteText: {
      type: String,
      required: false
    }
  },
});

wateringTaskSchema.pre('save', async function (next) {
  try {
    const dates = calculateDueDatesUntilOneYear(this.frequencyCount, this.frequencyUnit, this.frequencyInterval);

    this.createdDates = dates.map(created => {
      return {
      _id: new mongoose.Types.ObjectId(),
      date: created.date,
      isChecked: false,
      }
    });
   
    next();
  } catch (error) {
    next(error);
  }
});

const Plant = model('Plant', plantSchema);

module.exports = Plant;
