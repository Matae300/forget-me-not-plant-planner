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
    plant: async (parent, { _id }) => {  
      return await Plant.findOne({ _id }).populate('wateringTask');  
    },
    wateringTask: async (parent, { wateringTaskId }) => {
      try {
        const plant = await Plant.findOne({ 'wateringTask._id': wateringTaskId });
        if (!plant) {
          throw new Error('Plant not found');
        }
        return plant.wateringTask;
      } catch (error) {
        throw new Error(`Error finding watering task: ${error.message}`);
      }
    },
    singleOtherTask: async (parent, { otherTasksId }) => { 
      const plant = await Plant.findOne({ 'otherTasks._id': otherTasksId });
      if (!plant) {
        throw new Error('Plant not found');
      }

      const singleOtherTasks = plant.otherTasks.find(task => task._id.toString() === otherTasksId);
      if (!singleOtherTasks) {
        throw new Error('Task not found');
      }
      return singleOtherTasks;
    },
    myTasks: async (parent, args, context) => {
      if (!context.user) {
        throw new Error('You must be logged in to access your plants.');
      }

      const user = await User.findOne({  _id: context.user._id }).populate('plants');
      if (!user) {
        throw new Error("User not found");
      }
    
      const othertasks = user.plants.reduce((acc, plant) => {
        acc.push(...plant.otherTasks);
        return acc;
      }, []);
    
      return othertasks;
    },
    myPlants: async (parent, args, context) => {
      if (!context.user) {
        throw new Error('You must be logged in to access your plants.');
      }

      try {
        const user = await User.findOne({ _id: context.user._id }).populate('plants');
        if (!user) {
          throw new Error('User not found.');
        }

        return user.plants;
      } catch (error) {
        throw new Error(`Error fetching plants: ${error.message}`);
      }
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('plants');
      }
      throw new Error('You must be logged in to access this data.');;
    },
    allPlants: async () => {
      return await Plant.find({});
    }
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
        throw new Error('Invalid email or password');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error('Invalid email or password');
      }

      const token = signToken(user);
      return { token, user };
    },
    addPlant: async (parent, {  
      name,
      description,
      photoUrl,
      sunExposure,
      growingMonths,
      bloomingMonths,
      wateringTask,
      userNotes
    }, context) => {
      if (context.user) {
        const plant = await Plant.create({
          name,
          description,
          photoUrl,
          sunExposure,
          growingMonths,
          bloomingMonths,
          wateringTask,
          userNotes
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { plants: plant._id } }
        );

        return plant;
      }
      throw AuthenticationError;
    },
    addOtherTask: async (parent, { plantId, taskName, instructions, dates }, context) => {
      if (context.user) {
        const updatedPlant = await Plant.findOneAndUpdate(
          { _id: plantId },
          {
            $addToSet: {
              otherTasks: { taskName, instructions, dates },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return updatedPlant;
      }
      throw new AuthenticationError('User not authenticated');
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
    removeOtherTask: async (parent, { otherTasksId }, context) => {
      if (context.user) {
        const updatedPlant = await Plant.findOneAndUpdate(
          { "otherTasks._id": otherTasksId },
          {
            $pull: {
              otherTasks: { _id: otherTasksId },
            },
          },
          { new: true }
        );
        return updatedPlant;
      }
      throw AuthenticationError;
    }
  }
};

module.exports = resolvers;