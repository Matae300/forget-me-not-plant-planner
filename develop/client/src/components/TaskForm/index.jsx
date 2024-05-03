import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_TASK } from '../../utils/mutations';

import Auth from '../../utils/auth';

const addTaskForm = ({ plantId }) => {
  const [planting, setPlanting] = useState('');
  const [fertilizing, setFertilizing] = useState('');
  const [pruning, setPruning] = useState('');
  const [watering, setWatering] = useState('');

  
  const [addTask, { error }] = useMutation(ADD_TASK);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addTask({
        variables: {
          plantId,
          planting, 
          fertilizing, 
          pruning, 
          watering
        },
      });

      setPlanting('');
      setFertilizing('');
      setPruning('');
      setWatering('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'planting':
        setPlanting(value);
        break;
      case 'fertilizing':
        setFertilizing(value);
        break;
      case 'pruning':
        setPruning(value);
        break;
      case 'Watering':
        setWatering(value);
        break;
      default:
        break;
      }
    };

return (
  <div>
    <h3>Add Task</h3>

    {Auth.loggedIn() ? (

    <form onSubmit={handleFormSubmit}>
    <label htmlFor="planting">Planting:</label>
    <input 
      type="text"
      id="planting"
      name="planting"
      placeholder="Enter planting instructions"
      value={planting}
      onChange={handleChange}
    />

    <label htmlFor="fertilizing">Fertilizing:</label>
    <input 
      type="text"
      id="fertilizing"
      name="fertilizing"
      placeholder="Enter fertilizing instructions"
      value={fertilizing}
      onChange={handleChange}
    />

    <label htmlFor="pruning">Pruning:</label>
    <input 
      type="text"
      id="pruning"
      name="pruning"
      placeholder="Enter pruning instructions"
      value={pruning}
      onChange={handleChange}
    />

    <label htmlFor="watering">Watering:</label>
    <input 
      type="text"
      id="watering"
      name="watering"
      placeholder="Enter watering instructions"
      value={watering}
      onChange={handleChange}
    />

    <button type="submit">Add Task</button>
    
    </form>
      ) : (
        <p>
          You need to be logged in to add your plant. Please login or signup.
        </p>
      )}
    </div>
  );
};

export default addTaskForm;