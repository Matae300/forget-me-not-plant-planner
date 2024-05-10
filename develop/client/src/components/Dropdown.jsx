import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_PLANTS } from '../utils/queries'; 
import { ADD_PLANT_TO_USER } from '../utils/mutations';  


function Dropdown({ userId }) {
  const { loading, error, data } = useQuery(QUERY_ALL_PLANTS);
  const [selectedItem, setSelectedItem] = useState('');
  const [addPlantToUser] = useMutation(ADD_PLANT_TO_USER);

  const handleChange = async (event) => {
    const plantId = event.target.value;
  
    if (plantId) {
      try {
        await addPlantToUser({
          variables: {
            userId: userId,
            plantId: plantId
          }
        });
      } catch (err) {
        console.error("Error linking plant:", err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading plants data: {error.message}</p>;
  if (data && data.allPlants.length === 0) return <p>No plants available to select.</p>;

  return (
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
  );
}

export default Dropdown;