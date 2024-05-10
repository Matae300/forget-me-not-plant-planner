import { useApolloClient } from '@apollo/client'; // Import useApolloClient
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_SINGLE_PLANT } from '../../utils/queries';
import { REMOVE_PLANT } from '../../utils/mutations';
import { QUERY_MYPLANTS, QUERY_ME } from '../../utils/queries';
import Plants from '../../assets/images/plant.jpg'

const PlantList = ({ plants, onClick }) => {
  const client = useApolloClient(); // Initialize Apollo Client

  const { refetch: refetchPlants } = useQuery(QUERY_MYPLANTS);
  const { refetch: refetchMe } = useQuery(QUERY_ME);
  const [removePlantMutation] = useMutation(REMOVE_PLANT);

  const handleDeletePlant = async (plantId) => {
    try {
      await removePlantMutation({ variables: { plantId } });
      // Refetch notes and user information after deletion to update the lists
      refetchPlants();
      refetchMe();
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  const handlePlantClick = async (plantId) => {
    console.log('Clicked plantId:', plantId); // Add this line for debugging

    try {
      const { data } = await client.query({
        query: QUERY_SINGLE_PLANT,
        variables: { id: plantId },
      });
      onClick(data.plant); // Call onClick with the plant data
    } catch (error) {
      console.error('Error fetching plant data:', error);
    }
  };

  if (!plants.length) {
    return <h3>No Plants Yet</h3>;
  }

  return (
    <div>
      <h3>Plants</h3>
      {plants.map((plant) => (
        <div key={plant._id} className="card" onClick={() => handlePlantClick(plant._id)}>
          <div className="card-body bg-light p-2">
            <p>Name: {plant.name}</p>
            <img src={Plants} alt={plant.name} />
            <p>Instructions: {plant.wateringTask.instructions}</p>
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
