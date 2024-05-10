import { useState } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { QUERY_MYPLANTS, QUERY_MYNOTES, QUERY_SINGLE_PLANT } from '../utils/queries';

import PlantForm from '../components/PlantForm';
import NotesForm from '../components/NotesForm'

import PlantList from '../components/PlantList';
import NoteList from '../components/NoteList';
import SinglePlant from '../components/SinglePlant';

import './Plants.css';

const Plants = ({ authToken }) => {
  const { loading: plantsLoading, error: plantsError, data: plantsData } = useQuery(QUERY_MYPLANTS, {
    context: { headers: { Authorization: `Bearer ${authToken}` } }, 
  });
  
  const { loading: notesLoading, error: notesError, data: notesData } = useQuery(QUERY_MYNOTES, {
    context: { headers: { Authorization: `Bearer ${authToken}` } }, 
  });

  const [selectedPlant, setSelectedPlant] = useState(null);
  const client = useApolloClient();

  const fetchPlantData = async (id) => {
    try {
      const { data } = await client.query({
        query: QUERY_SINGLE_PLANT,
        variables: { id: id._id }, 
      });
      setSelectedPlant(data.plant); 
    } catch (error) {
      console.error('Error fetching plant data:', error);
    }
  };

  const handlePlantClick = (plantId) => {
    fetchPlantData(plantId);
  };

  const [showPlants, setShowPlants] = useState(true);

  const toggleDisplay = (isPlants) => {
    setShowPlants(isPlants);
  };

  if (plantsLoading || notesLoading) return <p>Loading...</p>;
  if (plantsError) return <p>Error fetching plants</p>;
  if (notesError) return <p>Error fetching notes</p>;

  return (
    <div className="plants-container">
      <div className="plants-sidebar">
        <button onClick={() => toggleDisplay(true)}>Show Plants</button>
        <button onClick={() => toggleDisplay(false)}>Show Notes</button>
        {showPlants ? (
          <div className="list-container">
            <h3>My Plants</h3>
            <PlantList plants={plantsData?.myPlants || []} onClick={handlePlantClick} />
          </div>
        ) : (
          <div className="list-container">
            <h3>My Notes</h3>
            <NoteList notes={notesData?.myNotes || []} />
          </div>
        )}
      </div>
      <div className="plants-content">
        <div className="form-container">
          <PlantForm />
        </div>
        <div className="form-container">
          <NotesForm />
        </div>
        <div className="single-container">
          <SinglePlant plant={selectedPlant} />
        </div>
      </div>
    </div>
  );
};

export default Plants;
