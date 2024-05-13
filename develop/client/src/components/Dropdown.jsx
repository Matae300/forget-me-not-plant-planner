import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_PLANTS } from '../utils/queries'; 
import { ADD_PLANT_TO_USER } from '../utils/mutations';  
import { useToggle } from '../utils/ToggleContext';
import AddPlantForm from './PlantForm/index'
import './Dropdown.css';

function Dropdown({ userId }) {
  const { loading, error, data } = useQuery(QUERY_ALL_PLANTS);
  const [selectedItem, setSelectedItem] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [showAddPlantForm, setShowAddPlantForm] = useState(false);
  const [addPlantToUser] = useMutation(ADD_PLANT_TO_USER);
  const { hideDropdownMenu } = useToggle();
  const [errormessage, setError] = useState('');
  const [success, setSuccess] = useState(false); 

  const handleSelect = (event) => {
    setSelectedItem(event.target.value);
    setConfirm(false); 
    setError(''); // Clear error message when selection changes
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
        setSelectedItem('');
        setSuccess(true); 
        setConfirm(false);   
        setError(''); // Clear error message on success
      } catch (err) { 
        console.error("Error linking plant:", err);
        setError('Failed to add plant. Please try again.');
      }
    }
  };

  const toggleAddPlantForm = () => {
    setShowAddPlantForm(!showAddPlantForm);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSuccess(false); // Reset success message after a certain duration
    }, 3000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timeout); // Cleanup on unmount or re-render
  }, [success]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading plants data: {error.message}</p>;
  if (data && data.allPlants.length === 0) return <p>No plants available to select.</p>;

  return (
    <div className='dropdropdown-container'>
      <h2>Add a plant to your garden</h2>
      {success && <div className="success-message">Plant added successfully!</div>}
      {errormessage && <div className="error-message">{errormessage}</div>}
      <select value={selectedItem} onChange={handleSelect}>
        <option value="">Select a plant</option>
        {data.allPlants.map((plant) => (
          <option key={plant._id} value={plant._id}>
            {plant.name}
          </option>
        ))}
      </select>
      <br></br>
      {selectedItem && (
        <button onClick={handleConfirm} disabled={confirm}>
          Confirm
        </button>
      )}
      <br></br>
      <button onClick={hideDropdownMenu}>Cancel</button>
      <br></br>
      <div>
      <h2>Add Custom Plant</h2>
      <button onClick={toggleAddPlantForm}>Add Custom Plant</button>
      <br></br>
      
      {showAddPlantForm && <AddPlantForm toggleForm={toggleAddPlantForm} />}
      </div>
    </div>
  );
}

export default Dropdown;