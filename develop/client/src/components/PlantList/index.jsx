import React from 'react';
import { useApolloClient } from '@apollo/client'; // Import useApolloClient
import { QUERY_SINGLE_PLANT } from '../../utils/queries';
import Plants from '../../assets/images/plant.jpg'

const PlantList = ({ plants, onClick }) => {
  const client = useApolloClient(); // Initialize Apollo Client

  const handlePlantClick = async (plantId) => {
    console.log('Clicked plantId:', plantId); // Add this line for debugging

    try {
      const { data } = await client.query({
        query: QUERY_SINGLE_PLANT,
        variables: { id: plantId },
      });
      onClick(data.plant); // Call onClick with the plant data
    } catch (error) {
      console.error('Error fetching plant data:', error);
    }
  };

  if (!plants.length) {
    return <h3>No Plants Yet</h3>;
  }

  return (
    <div>
      <h3>Plants</h3>
      {plants.map((plant) => (
        <div key={plant._id} className="card " onClick={() => handlePlantClick(plant._id)}>
          <div className="card-body bg-light p-2">
            <button>Delete Plant</button>
            <p>Name: {plant.name}</p>
            <p>Id: {plant._id}</p>
            <img src={Plants} alt={plant.name} />
            <p>Instructions: {plant.wateringTask.instructions}</p>
            <button>Add Task</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlantList;
