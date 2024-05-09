const db = require('../config/connection');
const { User, Plant } = require('../models');  // Ensure these are the correct paths
const userSeeds = require('./userSeeds.json');
const plantSeeds = require('./plantSeeds.json');

const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('User', 'users');
    await cleanDB('Plant', 'plants');

    console.log('Database cleaned successfully.');
    const users = await User.create(userSeeds);
    console.log(`${users.length} users added successfully!`);

    console.log('Plant seed data to be inserted:', JSON.stringify(plantSeeds, null, 2));

    // Create plants
    const plants = await Plant.create(plantSeeds);
    console.log(`${plants.length} plants added successfully!`);

  } catch (err) {
    console.error('Error during seeding process:', err);
    if (err && err.errors) {
      Object.keys(err.errors).forEach(key => {
        console.error(`Validation error for ${key}: ${err.errors[key].message}`);
      });
    }
  } finally {
    console.log('Seeding process completed.');
    process.exit(0);
  }
});