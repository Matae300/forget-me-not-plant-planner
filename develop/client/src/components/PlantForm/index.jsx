import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PLANT } from '../../utils/mutations';
import { QUERY_MYPLANTS, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

const AddPlantForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [sunExposure, setSunExposure] = useState('');
  const [growingMonths, setGrowingMonths] = useState('');
  const [bloomingMonths, setBloomingMonths] = useState('');
  const [instructions, setInstructions] = useState('');
  const [frequencyCount, setFrequencyCount] = useState('');
  const [frequencyUnit, setFrequencyUnit] = useState('');
  const [frequencyInterval, setFrequencyInterval] = useState('');
  const [userNotes, setUserNotes] = useState('');

  const [addPlant, { error }] = useMutation(ADD_PLANT, {
    refetchQueries: [
     QUERY_MYPLANTS, 
     'getPlants',
     QUERY_ME, 
     'me'
    ],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const wateringTaskVariables = {
        instructions,
        frequencyCount: parseInt(frequencyCount), // Parse as integer
        frequencyUnit,
        frequencyInterval: parseInt(frequencyInterval), // Parse as integer
      };
      
      const { data } = await addPlant({
        variables: {
          name,
          description,
          photoUrl,
          sunExposure,
          growingMonths,
          bloomingMonths,
          wateringTask: wateringTaskVariables,
          userNotes,
        },
      });

      setName('');
      setDescription('');
      setPhotoUrl('');
      setSunExposure('');
      setGrowingMonths('');
      setBloomingMonths('');
      setInstructions('');
      setFrequencyCount('');
      setFrequencyUnit('');
      setFrequencyInterval('');
      setUserNotes('');
    } catch (err) {
      console.error(err);
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
      case 'photoUrl':
        setPhotoUrl(value);
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
      case 'userNotes':
        setUserNotes(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h3>Add Plant</h3>
      {Auth.loggedIn() ? (
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="name">Plant Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <br/>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
          />
          <br/>
          <label htmlFor="photoUrl">Photo URL:</label>
          <input
            type="url"
            id="photoUrl"
            name="photoUrl"
            value={photoUrl}
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
            <option value="days">Days</option>
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
          <label htmlFor="userNotes">User Notes:</label>
          <input
            type="text"
            id="userNotes"
            name="userNotes"
            value={userNotes}
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
