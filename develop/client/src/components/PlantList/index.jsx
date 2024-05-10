import React, { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_SINGLE_PLANT } from '../../utils/queries';
import { REMOVE_PLANT } from '../../utils/mutations';
import { QUERY_MYPLANTS, QUERY_ME } from '../../utils/queries';
import Plants from '../../assets/images/plant.jpg';
import { usePlant } from '../../utils/GlobalState'; // Import usePlant hook from correct context (PlantContext)

const PlantList = ({ plants, onClick }) => {
  const client = useApolloClient();
  const { refetch: refetchPlants } = useQuery(QUERY_MYPLANTS);
  const { refetch: refetchMe } = useQuery(QUERY_ME);
  const [removePlantMutation] = useMutation(REMOVE_PLANT);
  const { plantsColor, setPlantsColor } = usePlant(); // Use usePlant hook from PlantContext

  const [plantsList, setPlantsList] = useState(plants); // State to manage the list of plants

  const handleDeletePlant = async (plantId) => {
    try {
      await removePlantMutation({ variables: { plantId } });
      // Optimistic UI update: Remove plant immediately from the list
      setPlantsList(plantsList.filter(plant => plant._id !== plantId));
      refetchPlants();
      refetchMe();
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  const handlePlantClick = async (plantId) => {
    try {
      const { data } = await client.query({
        query: QUERY_SINGLE_PLANT,
        variables: { id: plantId },
      });
      onClick(data.plant);
    } catch (error) {
      console.error('Error fetching plant data:', error);
    }
  };

  useEffect(() => {
    setPlantsList(plants); // Update plantsList when the plants prop changes
  }, [plants]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPlantsColor(false); // Change to false after 10 seconds
      localStorage.setItem('plantsColor', 'false'); // Save to local storage
    }, 10000);

    return () => clearTimeout(timeout);
  }, [setPlantsColor]);

  return (
    <div>
      <h3>Plants</h3>
      {plantsList.map((plant) => (
        <div
          key={plant._id}
          className="card"
          onClick={() => handlePlantClick(plant._id)}
        >
          <div className="card-body bg-light p-2">
            <p>Name: {plant.name}</p>
            <img
              src={Plants}
              alt={plant.name}
              style={{ border: `7px solid ${plantsColor ? 'green' : 'orange'}` }}
            />
            {plant.wateringTask && plant.wateringTask.instructions && (
              <p>Instructions: {plant.wateringTask.instructions}</p>
            )}
            <button className="btn btn-danger" onClick={() => handleDeletePlant(plant._id)}>
              DELETE PLANT
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlantList;
