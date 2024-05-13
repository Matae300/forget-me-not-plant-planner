import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_PLANTS } from '../utils/queries';
import { ADD_PLANT_TO_USER } from '../utils/mutations';
import { useToggle } from '../utils/ToggleContext';
import AddPlantForm from './PlantForm/index';
import './Dropdown.css';

function Dropdown({ userId }) {
  const { loading, error, data } = useQuery(QUERY_ALL_PLANTS);
  const [selectedItem, setSelectedItem] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [showAddPlantForm, setShowAddPlantForm] = useState(false);
  const [addPlantToUser] = useMutation(ADD_PLANT_TO_USER);
  const { hideDropdownMenu } = useToggle();

  useEffect(() => {
    // Show or hide the dropdown container based on data availability
    const container = document.getElementById('addPlantContainer');
    if (data && data.allPlants.length > 0) {
      container.classList.add('populated');
      container.classList.remove('empty');
    } else {
      container.classList.add('empty');
      container.classList.remove('populated');
    }
  }, [data]);

  const handleSelect = (event) => {
    setSelectedItem(event.target.value);
    setConfirm(false);
  };

  const handleConfirm = async () => {
    console.log("Adding plant to user:", selectedItem);
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

  const toggleAddPlantForm = () => {
    setShowAddPlantForm(!showAddPlantForm);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading plants data: {error.message}</p>;
  if (data && data.allPlants.length === 0) return <p>No plants available to select.</p>;

  return (
    <div id="addPlantContainer" className="dropdown-container">
      <h2>Add a plant to your garden</h2>
      <select value={selectedItem} onChange={handleSelect}>
        <option value="">Select a plant</option>
        {data.allPlants.map((plant) => (
          <option key={plant._id} value={plant._id}>
            {plant.name}
          </option>
        ))}
      </select>
      <br />
      {selectedItem && (
        <button onClick={handleConfirm} disabled={confirm} className="confirm-button">
          Confirm
        </button>
      )}
      <br />
      <button onClick={hideDropdownMenu}>Cancel</button>
      <br />
      <div>
        <h2>Add Custom Plant</h2>
        <button onClick={toggleAddPlantForm}>Add Custom Plant</button>
        <br />
        {showAddPlantForm && <AddPlantForm toggleForm={toggleAddPlantForm} />}
      </div>
    </div>
  );
}

export default Dropdown;
