const { User, Plant, WateringTask } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate('plants');
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username }).populate('plants');
    },
    allPlants: async () => {
      return await Plant.find();
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
    singleUserNotes: async (parent, { userNotesId }) => { 
      const plant = await Plant.findOne({ 'userNotes._id': userNotesId });
      if (!plant) {
        throw new Error('Plant not found');
      }

      const singleuserNotes = plant.userNotes.find(userNotes => userNotes._id.toString() === userNotesId);
      if (!singleuserNotes) {
        throw new Error('note not found');
      }
      return singleuserNotes;
    },
    myNotes: async (parent, args, context) => {
      if (!context.user) {
        throw new Error('You must be logged in to access your plants.');
      }
    
      const user = await User.findById({ _id: context.user._id }).populate('plants');
      if (!user) {
        throw new Error('User not found.');
      }
    
      const allUserNotes = user.plants.reduce((acc, plant) => {
        acc.push(...plant.userNotes);
        return acc;
      }, []);
    
      return allUserNotes;
    },
    myPlants: async (parent, args, context) => {
      if (context.user) {
      try {
        const user = await User.findById(context.user._id).populate('plants');
        if (!user) {
          throw new Error('User not found.');
        }

        return user.plants;
      } catch (error) {
        throw new Error(`Error fetching plants: ${error.message}`);
      }
    }
    throw AuthenticationError
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new Error('You must be logged in to access this data.');;
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
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { plants: plant._id } }
        );

        return plant;
      }
      throw AuthenticationError;
    },
    addPlantToUser: async (_, { userId, plantId }, context) => {
      if (!context.user) throw new AuthenticationError('Not authenticated');
    
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');
    
      
      const alreadyAdded = user.plants.some(pid => pid.equals(plantId));
      if (alreadyAdded) {
        throw new Error('Plant already added to the user');
      }
    
      const plant = await Plant.findById(plantId);
      if (!plant) throw new Error('Plant not found');
    
      
      user.plants.push(plant._id);
      await user.save();
    
      return plant;  
    },
    updateWateringTask: async (parent, { taskId, isChecked }, context) => {
      if (context.user) {
        console.log(taskId, isChecked)
        const wateringTask = await Plant.findOneAndUpdate(
          { 
            'wateringTask.createdDates._id': taskId
          },
          {
            $set: {
              'wateringTask.createdDates.$.isChecked': isChecked,
            }
          },
          {
            new: true
          }
          );
        return wateringTask;

      }
    },
    addUserNotes: async (parent, { plantId, noteName, noteText}, context) => {
      if (context.user) {
        const updatedPlant = await Plant.findOneAndUpdate(
          { _id: plantId },
          {
            $addToSet: {
              userNotes: { noteName, noteText },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return updatedPlant;
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
    removeUserNotes: async (parent, { userNotesId }, context) => {
      if (context.user) {
        const updatedPlant = await Plant.findOneAndUpdate(
          { "userNotes._id": userNotesId },
          {
            $pull: {
              userNotes: { _id: userNotesId },
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