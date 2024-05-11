import { useState } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { QUERY_MYPLANTS, QUERY_SINGLE_PLANT } from '../utils/queries';
import Auth from '../utils/auth';

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

  if (plantsLoading) return <p>Loading...</p>;



  return (
    <div className="plants-container">
      {Auth.loggedIn() ? (
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
              <NoteList plants={plantsData?.myPlants || []} />
            </div>
          )}
        </div>
      ) : (
        <p>You need to be logged in. Please log in or sign up.</p>
      )}
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