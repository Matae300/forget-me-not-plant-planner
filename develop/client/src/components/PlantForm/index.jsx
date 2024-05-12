import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { ADD_NEWPLANT } from '../../utils/actions';

import { useMutation } from '@apollo/client';
import { ADD_PLANT } from '../../utils/mutations';
import { QUERY_MYPLANTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const AddPlantForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sunExposure, setSunExposure] = useState('');
  const [growingMonths, setGrowingMonths] = useState('');
  const [bloomingMonths, setBloomingMonths] = useState('');
  const [instructions, setInstructions] = useState('');
  const [frequencyCount, setFrequencyCount] = useState('');
  const [frequencyUnit, setFrequencyUnit] = useState('');
  const [frequencyInterval, setFrequencyInterval] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); 

  const dispatch = useDispatch();
  const plants = useSelector((state) => state); 

  const [addPlant] = useMutation(ADD_PLANT, {
    refetchQueries: [
      QUERY_MYPLANTS, 
      QUERY_ME
    ],
    errorPolicy: 'all',
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!instructions.trim()) {
      setError('Please enter instructions');
      return;
    }
    if (!frequencyCount.trim()) {
      setError('Please enter count.');
      return;
    }
    if (!frequencyUnit.trim()) {
      setError('Please enter Unit.');
      return;
    }
    if (!frequencyInterval.trim()) {
      setError('Please enter interval.');
      return;
    }

    try {
      const wateringTaskVariables = {
        instructions,
        frequencyCount: parseInt(frequencyCount),
        frequencyUnit,
        frequencyInterval: parseInt(frequencyInterval),
      };

      await addPlant({
        variables: {
          name,
          description,
          sunExposure,
          growingMonths,
          bloomingMonths,
          wateringTask: wateringTaskVariables,
        },
      });

  
      setName('');
      setDescription('');
      setSunExposure('');
      setGrowingMonths('');
      setBloomingMonths('');
      setInstructions('');
      setFrequencyCount('');
      setFrequencyUnit('');
      setFrequencyInterval('');
      setSuccess(true); 
      setError(''); 

      dispatch({ type: ADD_NEWPLANT, payload: 
        {
        plantName: name,
        description: description,
        sunExposure: sunExposure,
        growingMonths: growingMonths,
        bloomingMonths: bloomingMonths,
        wateringTask: wateringTaskVariables
       } 
      });

      console.log(plants)

    } catch (err) {
      console.error('Error adding plant:', err);
      setError('Failed to add plant. Please try again.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'sunExposure':
        setSunExposure(value);
        break;
      case 'growingMonths':
        setGrowingMonths(value);
        break;
      case 'bloomingMonths':
        setBloomingMonths(value);
        break;
      case 'instructions':
        setInstructions(value);
        break;
      case 'frequencyCount':
        setFrequencyCount(value);
        break;
      case 'frequencyUnit':
        setFrequencyUnit(value);
        break;
      case 'frequencyInterval':
        setFrequencyInterval(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h3>Add Plant</h3>
      {success && <div className="success-message">Plant added successfully!</div>} {/* Render success message */}
      {Auth.loggedIn() ? (
        <form onSubmit={handleFormSubmit}>
          {error && <div className="error-message">{error}</div>}
          <h4>Required</h4>
          <label htmlFor="name">Plant Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <br/>
          <label htmlFor="instructions">Instructions:</label>
          <input
            type="text"
            id="instructions"
            name="instructions"
            value={instructions}
            onChange={handleChange}
          />
          <br/>
          <label htmlFor="frequencyCount">Frequency Count:</label>
          <input
            type="text"
            id="frequencyCount"
            name="frequencyCount"
            value={frequencyCount}
            onChange={handleChange}
          />
          <br/>
          <label htmlFor="frequencyUnit">Frequency Unit:</label>
          <select
            id="frequencyUnit"
            name="frequencyUnit"
            value={frequencyUnit}
            onChange={handleChange}
          >
            <option value="">Select Frequency Unit</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
          </select>
          <br/>
          <label htmlFor="frequencyInterval">Frequency Interval:</label>
          <input
            type="text"
            id="frequencyInterval"
            name="frequencyInterval"
            value={frequencyInterval}
            onChange={handleChange}
          />
          <br/>
          <h4>Optional</h4>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
          />
          <br/>
          <label htmlFor="sunExposure">Sun Exposure:</label>
          <input
            type="text"
            id="sunExposure"
            name="sunExposure"
            value={sunExposure}
            onChange={handleChange}
          />
          <br/>
          <label htmlFor="growingMonths">Growing Months:</label>
          <input
            type="text"
            id="growingMonths"
            name="growingMonths"
            value={growingMonths}
            onChange={handleChange}
          />
          <br/>
          <label htmlFor="bloomingMonths">Blooming Months:</label>
          <input
            type="text"
            id="bloomingMonths"
            name="bloomingMonths"
            value={bloomingMonths}
            onChange={handleChange}
          />
          <br/>
          <button type="submit">Add Plant</button>
        </form>
        ) : (
          <p>
            You need to be logged in to add your plant. Please login or signup.
          </p>
        )}
    </div>
  );
};

export default AddPlantForm;
