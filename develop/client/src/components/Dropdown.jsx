import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_PLANTS } from '../utils/queries'; 
import { ADD_PLANT_TO_USER } from '../utils/mutations';  


function Dropdown({userId}) {
  const { loading, error, data } = useQuery(QUERY_ALL_PLANTS);
  const [selectedItem, setSelectedItem] = useState('');
  const [addPlantToUser] = useMutation(ADD_PLANT_TO_USER);

const handleChange = async (event) => {
  const plantId = event.target.value;
  const plant = data.allPlants.find((plant) => plant._id === plantId);
  setSelectedItem(plant);

  if (plant) {
    try {
      await addPlantToUser({
        variables: {
          userId: userId,
          name: plant.name,
          wateringTask: {
            
            instructions: plant.wateringTask.instructions,
            frequencyCount: plant.wateringTask.frequencyCount,
            frequencyUnit: plant.wateringTask.frequencyUnit,
            frequencyInterval: plant.wateringTask.frequencyInterval
          },
          description: plant.description,
          photoUrl: plant.photoUrl,
          sunExposure: plant.sunExposure,
          growingMonths: plant.growingMonths,
          bloomingMonths: plant.bloomingMonths,
          userNotes: plant.userNotes 
        }
      });
    } catch (err) {
      console.error(err);
    }
  }
};


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data && data.allPlants.length === 0) return <p>No plants available to select.</p>;



  return (
    <div>
      <div>
        <select value={selectedItem} onChange={handleChange}>
          <option value="">Select a plant</option>
          {data.allPlants.map((plant) => (
            <option key={plant._id} value={plant._id}>
              {plant.name}
            </option>
          ))}
        </select>
      </div>
        <div>
          <p>testing</p>
        </div>
    </div>
  );
}

export default Dropdown;