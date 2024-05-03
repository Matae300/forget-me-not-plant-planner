import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_PLANT } from '../../utils/mutations';
import { QUERY_PLANTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const addPlantForm = ({}) => {
  const [name, setPlantName] = useState('');
  const [description, setDescription] = useState('');
  const [wateringFrequency, setWateringFrequency] = useState('');
  const [wateringInstructions, setWateringInstructions] = useState('');
  const [sunExposure, setSunExposure] = useState('');
  const [growingMonths, setGrowingMonths] = useState('');
  const [bloomSeason, setBloomSeason] = useState('');
  const [whenToPlant, setWhenToPlant] = useState('');
  const [spacing, setSpacing] = useState('');
  const [fertilization, setFertilization] = useState('');

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
          wateringFrequency,
          wateringInstructions,
          sunExposure,
          growingMonths,
          bloomSeason,
          whenToPlant,
          spacing,
          fertilization 
        },
      });

      setPlantName('');
      setDescription('');
      setWateringFrequency('');
      setWateringInstructions('');
      setSunExposure('');
      setGrowingMonths('');
      setBloomSeason('');
      setWhenToPlant('');
      setSpacing('');
      setFertilization('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'Name':
        setPlantName(value);
        break;
      case 'Description':
        setDescription(value);
        break;
      case 'Watering Frequency':
        setWateringFrequency(value);
        break;
      case 'Watering Instructions':
        setWateringInstructions(value);
        break;
      case 'Sun Exposure':
        setSunExposure(value);
        break;
      case 'Growing Months':
        setGrowingMonths(value);
        break;
      case 'Bloom Season':
        setBloomSeason(value);
        break;
      case 'When To Plant':
        setWhenToPlant(value);
        break;
      case 'Spacing':
        setSpacing(value);
        break;
      case 'Fertilization':
        setFertilization(value);
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
      <label htmlFor="name">Plant Name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Plant's name here..."
        value={name}
        onChange={handleChange}
      />

      <label htmlFor="description">Description</label>
      <input
        type="text"
        id="description"
        name="description"
        placeholder="Description"
        value={description}
        onChange={handleChange}
      />

      <label htmlFor="wateringFrequency">Watering Frequency</label>
      <input
        type="text"
        id="wateringFrequency"
        name="wateringFrequency"
        placeholder="Watering Frequency"
        value={wateringFrequency}
        onChange={handleChange}
      />

      <label htmlFor="wateringInstructions">Watering Instructions</label>
      <input
        type="text"
        id="wateringInstructions"
        name="wateringInstructions"
        placeholder="Watering Instructions"
        value={wateringInstructions}
        onChange={handleChange}
      />

      <label htmlFor="sunExposure">Sun Exposure</label>
      <input
        type="text"
        id="sunExposure"
        name="sunExposure"
        placeholder="Sun Exposure"
        value={sunExposure}
        onChange={handleChange}
      />

      <label htmlFor="growingMonths">Growing Months</label>
      <input
        type="text"
        id="growingMonths"
        name="growingMonths"
        placeholder="Growing Months"
        value={growingMonths}
        onChange={handleChange}
      />

      <label htmlFor="bloomSeason">Bloom Season</label>
      <input
        type="text"
        id="bloomSeason"
        name="bloomSeason"
        placeholder="Bloom Season"
        value={bloomSeason}
        onChange={handleChange}
      />

      <label htmlFor="whenToPlant">When to Plant</label>
      <input
        type="text"
        id="whenToPlant"
        name="whenToPlant"
        placeholder="When To Plant"
        value={whenToPlant}
        onChange={handleChange}
      />

      <label htmlFor="spacing">Spacing</label>
      <input
        type="text"
        id="spacing"
        name="spacing"
        placeholder="Spacing"
        value={spacing}
        onChange={handleChange}
      />

      <label htmlFor="fertilization">Fertilization</label>
      <input
        type="text"
        id="fertilization"
        name="fertilization"
        placeholder="Fertilization"
        value={fertilization}
        onChange={handleChange}
      />

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

export default addPlantForm;