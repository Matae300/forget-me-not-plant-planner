import React, { useState } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { QUERY_MYPLANTS, QUERY_MYTASKS, QUERY_SINGLE_PLANT } from '../utils/queries';

import PlantForm from '../components/PlantForm';
import TaskForm from '../components/TaskForm';

import PlantList from '../components/PlantList';
import TaskList from '../components/TaskList';
import SinglePlant from '../components/SinglePlant';

import './Plants.css';

const Plants = ({ authToken }) => {
  const { loading: plantsLoading, error: plantsError, data: plantsData } = useQuery(QUERY_MYPLANTS, {
    context: { headers: { Authorization: `Bearer ${authToken}` } }, 
  });

  const { loading: tasksLoading, error: tasksError, data: tasksData } = useQuery(QUERY_MYTASKS, {
    context: { headers: { Authorization: `Bearer ${authToken}` } }, 
  });

  const [selectedPlant, setSelectedPlant] = useState(null);
  const client = useApolloClient();

  const fetchPlantData = async (id) => {
    try {
      const { data } = await client.query({
        query: QUERY_SINGLE_PLANT,
        variables: { id: id._id }, // Pass the string ID here, assuming id._id is the correct ID field
      });
      setSelectedPlant(data.plant); // Set the plant data in state
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

  if (plantsLoading || tasksLoading) return <p>Loading...</p>;
  if (plantsError || tasksError) return <p>Error fetching data</p>;

  return (
    <div className="plants-container">
      <div className="plants-sidebar">
      <div>
        <button>ADD PLANT</button>
      </div>
        <button onClick={() => toggleDisplay(true)}>Show Plants</button>
        <button onClick={() => toggleDisplay(false)}>Show Tasks</button>
        {showPlants ? (
          <div className="list-container">
            <h3>My Plants</h3>
            <PlantList plants={plantsData?.myPlants || []} onClick={handlePlantClick} />
          </div>
        ) : (
          <div className="list-container">
            <h3>My Tasks</h3>
            <TaskList tasks={tasksData?.myTasks || []} />
          </div>
        )}
      </div>
      <div className="plants-content">
        <div className="form-container">
          <PlantForm />
        </div>
        <div className="form-container">
          <TaskForm />
        </div>
        <div className="form-container">
          <SinglePlant plant={selectedPlant} />
        </div>
      </div>
    </div>
  );
};

export default Plants;
