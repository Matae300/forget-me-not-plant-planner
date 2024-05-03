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
        <input 
         name="name"
         placeholder="plant's name here..."
         value={name}
         onChange={handleChange}>
        </input>
        <input 
         name="description"
         placeholder="description."
         value={description}
         onChange={handleChange}>
        </input>
        <input 
         name="Watering Frequency"
         placeholder="Watering Frequency."
         value={wateringFrequency}
         onChange={handleChange}>
        </input>
        <input 
         name="Watering Instructions"
         placeholder="Watering Instructions"
         value={wateringInstructions}
         onChange={handleChange}>
        </input>
        <input 
         name="Sun Exposure"
         placeholder="Sun Exposure"
         value={sunExposure}
         onChange={handleChange}>
        </input>
        <input 
         name="Growing Months"
         placeholder="Growing Months"
         value={growingMonths}
         onChange={handleChange}>
        </input>
        <input 
         name="Bloom Season"
         placeholder="Bloom Season"
         value={bloomSeason}
         onChange={handleChange}>
        </input>
        <input 
         name="When To Plant"
         placeholder="When To Plant"
         value={whenToPlant}
         onChange={handleChange}>
        </input>
        <input 
         name="Spacing"
         placeholder="Spacing"
         value={spacing}
         onChange={handleChange}>
        </input>
        <input 
         name="Fertilization"
         placeholder="fertilization"
         value={fertilization}
         onChange={handleChange}>
        </input>

        <button>
          Add Plant
        </button>
        
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