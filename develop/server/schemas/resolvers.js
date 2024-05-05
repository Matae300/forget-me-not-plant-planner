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
    plants: async (parent, { username }) => { 
    const user = await User.findOne({ username }).populate('plants');
      if (!user) {
      throw new Error('User not found');
      }

      return user.plants;
    },
    plant: async (parent, { _id }) => {  
      return await Plant.findOne({ _id }).populate('tasks');  
    },
    wateringTask: async () => {
      const user = await User.findOne({ username }).populate('plants');
      if (!user) {
        throw new Error("User not found");
      }
    
      const wateringTask = user.wateringTask.reduce((acc, plant) => {
        acc.push(...plant.wateringTask);
        return acc;
      }, []);
    
      return wateringTask;
    },
    singleOtherTasks: async (parent, { otherTasksId }) => { 

      const plant = await Plant.findOne({ 'otherTasksId._id': otherTasksId });
      if (!plant) {
        throw new Error('Plant not found');
      }

      const singleOtherTasks = plant.otherTasks.find(task => task._id.toString() === taskId);
      if (!task) {
        throw new Error('Task not found');
      }
      return singleOtherTasks;
    },
    OtherTasks: async (parent, { username }) => { 
      const user = await User.findOne({ username }).populate('plants');
      if (!user) {
        throw new Error("User not found");
      }
    
      const othertasks = user.plants.reduce((acc, plant) => {
        acc.push(...plant.otherTasks);
        return acc;
      }, []);
    
      return othertasks;
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
      bloomingMonths,
      wateringTask,
      userNotes 
    }, context) => {
      if (context.user) {
        const plant = await Plant.create({
          name,
          description,
          wateringFrequency,
          wateringInstructions,
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
    addOtherTask: async (parent, { 
      plantId,  
      name,
      instructions,
      dates: [Date] 
    }, context) => {
      if (context.user) {
        return Plant.findOneAndUpdate(
          { _id: plantId },
          {
            $addToSet: {
              tasks: {   
                name,
                instructions,
                dates: [Date] },
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
    removeTask: async (parent, { otherTasksId }, context) => {
      if (context.user) {
        return Plant.findOneAndUpdate(
          { "otherTasksId._id": otherTasksId }, 
          {
            $pull: {
              tasks: { _id: otherTasksId },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('User not authenticated');
    }
  }
};

module.exports = resolvers;
