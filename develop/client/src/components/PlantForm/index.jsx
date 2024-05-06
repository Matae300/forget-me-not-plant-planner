import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PLANT } from '../../utils/mutations';
import { QUERY_PLANTS, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

const AddPlantForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [sunExposure, setSunExposure] = useState('');
  const [growingMonths, setGrowingMonths] = useState('');
  const [bloomingMonths, setBloomingMonths] = useState('');
  const [wateringTask, setWateringTask] = useState('');
  const [userNotes, setUserNotes] = useState('');

  const [addPlant, {error}] = useMutation
  (ADD_PLANT, {
    refetchQueries: [
      QUERY_PLANTS,
      'getPlants',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addPlant({
        variables: {
          name,
          description,
          photoUrl,
          sunExposure,
          growingMonths,
          bloomingMonths,
          wateringTask,
          userNotes,
        },
      });

      setName('');
      setDescription('');
      setPhotoUrl('');
      setSunExposure('');
      setGrowingMonths('');
      setBloomingMonths('');
      setWateringTask('');
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
      case 'wateringTask':
        setWateringTask(value);
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

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
          />

          <label htmlFor="photoUrl">Photo URL:</label>
          <input
            type="url"
            id="photoUrl"
            name="photoUrl"
            value={photoUrl}
            onChange={handleChange}
          />

          <label htmlFor="sunExposure">Sun Exposure:</label>
          <input
            type="text"
            id="sunExposure"
            name="sunExposure"
            value={sunExposure}
            onChange={handleChange}
          />

          <label htmlFor="growingMonths">Growing Months:</label>
          <input
            type="text"
            id="growingMonths"
            name="growingMonths"
            value={growingMonths}
            onChange={handleChange}
          />

          <label htmlFor="bloomingMonths">Blooming Months:</label>
          <input
            type="text"
            id="bloomingMonths"
            name="bloomingMonths"
            value={bloomingMonths}
            onChange={handleChange}
          />

          <label htmlFor="wateringTask">Watering Task:</label>
          <input
            type="text"
            id="wateringTask"
            name="wateringTask"
            value={wateringTask}
            onChange={handleChange}
          />

          <label htmlFor="userNotes">User Notes:</label>
          <input
            type="text"
            id="userNotes"
            name="userNotes"
            value={userNotes}
            onChange={handleChange}
          />

          <button type="submit">Add Plant</button>
        </form>
      ) : (
        <p>You need to be logged in to add your plant. Please login or signup.</p>
      )}
    </div>
  );
};

export default AddPlantForm;
