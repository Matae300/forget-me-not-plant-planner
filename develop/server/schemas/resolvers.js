const { User, Plant } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('plants');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('plants');
    },
    plants: async (parent, { username }, context) => { 
      const params = username ? { username } : {}; 
      return await Plant.find(params).sort({ createdAt: -1 }).populate('tasks');
    },
    plant: async (parent, { _id }) => {  
      return await Plant.findOne({ _id }).populate('tasks');  
    },
    task: async (parent, { taskId }) => { 
       
      const plant = await Plant.findOne({ 'tasks._id': taskId });
      if (!plant) {
        throw new Error('Plant not found');
      }

      const task = plant.tasks.find(task => task._id.toString() === taskId);
      if (!task) {
        throw new Error('Task not found');
      }
      return task;
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('plants');
      }
      throw new AuthenticationError('User not authenticated');
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
      fertilization  }, context) => {
      if (context.user) {
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
      }
      throw AuthenticationError;
    },
    addTask: async (parent, { plantId, planting, fertilizing, pruning, watering }, context) => {
      if (context.user) {
        return Plant.findOneAndUpdate(
          { _id: plantId },
          {
            $addToSet: {
              tasks: { planting, fertilizing, pruning, watering },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removePlant: async (parent, { plantId }, context) => {
      if (context.user) {
        const plant = await Plant.findOneAndDelete({
          _id: plantId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { plants: plant._id } }
        );

        return plant;
      }
      throw AuthenticationError;
    },
    removeTask: async (parent, { plantId, taskId }, context) => {
      if (context.user) {
        return Plant.findOneAndUpdate(
          { _id: plantId },
          {
            $pull: {
              tasks: {
                _id: taskId,
                planting, 
                fertilizing, 
                pruning, 
                watering 
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  }
};

module.exports = resolvers;
