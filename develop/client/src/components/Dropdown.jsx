import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_PLANTS } from '../utils/queries'; 
import { ADD_PLANT_TO_USER } from '../utils/mutations';  


function Dropdown({ userId }) {
  const { loading, error, data } = useQuery(QUERY_ALL_PLANTS);
  const [selectedItem, setSelectedItem] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [addPlantToUser] = useMutation(ADD_PLANT_TO_USER);

  const handleSelect = (event) => {
    setSelectedItem(event.target.value);
    setConfirm(false); 
  };

  const handleConfirm = async () => {
    if (selectedItem) {
      try {
        await addPlantToUser({
          variables: {
            userId: userId,
            plantId: selectedItem
          }
        });
        alert("Plant successfully linked to your profile!");
        setSelectedItem(''); 
        setConfirm(false);   
        window.location.reload();
      } catch (err) {
        console.error("Error linking plant:", err);
        alert("Failed to link plant: " + err.message);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading plants data: {error.message}</p>;
  if (data && data.allPlants.length === 0) return <p>No plants available to select.</p>;

  return (
    <div>
      <select value={selectedItem} onChange={handleSelect}>
        <option value="">Select a plant</option>
        {data.allPlants.map((plant) => (
          <option key={plant._id} value={plant._id}>
            {plant.name}
          </option>
        ))}
      </select>
      {selectedItem && (
        <button onClick={handleConfirm} disabled={confirm}>
          Confirm
        </button>
      )}
    </div>
  );
}

export default Dropdown;