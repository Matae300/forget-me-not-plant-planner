const { User, Plant, Task } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express'); 

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate('plants');
      }
      throw new AuthenticationError('User not authenticated');
    },
    plants: async (parent, { username }, context) => { 
      const params = username ? { username } : {}; 
      return await Plant.find(params).sort({ createdAt: -1 }).populate('tasks');
    },
    plant: async (parent, { plantId }) => { 
      return await Plant.findOne({ _id: plantId }).populate('tasks');
    },
    tasks: async (parent, { username }, context) => { 
      const params = username ? { username } : {}; 
      return await Task.find(params).sort({ createdAt: -1 });
    },
    task: async (parent, { taskId }) => { 
      return await Task.findOne({ _id: taskId });
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError('Invalid email or password');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Invalid email or password');
      }

      const token = signToken(user);
      return { token, user };
    },
    addPlant: async (parent, { 
      name, 
      description,
      wateringFrequency,
      wateringInstructions,
      sunExposure,
      growingMonths,
      bloomSeason,
      whenToPlant,
      spacing,
      fertilization 
    }, context) => {
      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }
    
      try {
        const plant = await Plant.create({
          name, 
          description,
          wateringFrequency,
          wateringInstructions,
          sunExposure,
          growingMonths,
          bloomSeason,
          whenToPlant,
          spacing,
          fertilization 
        });
    
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { plants: plant._id } }
        );
    
        return plant;
      } catch (error) {
        if (error.name === 'ValidationError') {
          throw new Error('Validation error: Please check your input and try again.');
        } else if (error.code === 11000) {
          throw new Error('Duplicate key error: Plant with the same name already exists.');
        } else {
          throw new Error('Failed to create plant. Please try again later.');
        }
      }
    },
    removePlant: async (parent, { plantId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }
    
      try {
        const plant = await Plant.findOneAndDelete({ _id: plantId });
    
        if (!plant) {
          throw new Error('Plant not found'); 
        }
    
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { plants: plant._id } }
        );
    
        return plant;
      } catch (error) {
        if (error.name === 'CastError') {
          throw new Error('Invalid plant ID'); 
        } else {
          throw new Error('Failed to remove plant. Please try again later.');
        }
      }
    },
    addTask: async (parent, { 
      planting,
      fertilizing,
      pruning,
      watering
    }, context) => {
      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }
    
      try {
        const task = await Task.create({
          planting,
          fertilizing,
          pruning,
          watering
        });
    
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { tasks: task._id } }
        );
    
        return task;
      } catch (error) {
        if (error.name === 'ValidationError') {
          throw new Error('Validation error: Please check your input and try again.');
        } else {
          throw new Error('Failed to create task. Please try again later.');
        }
      }
    },
    removeTask: async (parent, { taskId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }
    
      try {
        const task = await Task.findOneAndDelete({ _id: taskId });
    
        if (!task) {
          throw new Error('Task not found'); 
        }
    
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { tasks: task._id } }
        );
    
        return task;
      } catch (error) {
        if (error.name === 'CastError') {
          throw new Error('Invalid task ID'); 
        } else {
          throw new Error('Failed to remove task. Please try again later.');
        }
      }
    },
  }
};

module.exports = resolvers;
