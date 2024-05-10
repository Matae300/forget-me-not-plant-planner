import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Dropdown from '../components/Dropdown';
import Auth from '../utils/auth';

const Profile = () => {
  if (!Auth.loggedIn()) {
    console.log('No username available, user might not be logged in');
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }
  
  const { loading, error, data } = useQuery(QUERY_ME);

  const user = data?.me || {};
  console.log('User data:', user);



  if (loading) {
    console.log('Still loading data');
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("GraphQL Error:", error);
    return <p>Error loading profile.</p>;
  }



  console.log('Rendering profile page', user.username);
  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {user.username}'s` profile.
        </h2>
        
      </div>
      <div>
      <Dropdown userId={user._id}/>
      </div>
      {/* below could be the garden component, would just need to pass it the user data,  ex. <Garden data={user} /> */}
      <div className="plants-list">
        <h3>{user.username}'s Plants:</h3>
        {user.plants && user.plants.length > 0 ? (
          <ul>
            {user.plants.map((plant, index) => (
              <li key={index}>
                <strong>{plant.name}</strong> - {plant.description}<br/>
                Sun Exposure: {plant.sunExposure}<br/>
                Growing Months: {plant.growingMonths}<br/>
                Blooming Months: {plant.bloomingMonths}<br/>
                Watering Instructions: {plant.wateringTask.instructions}<br/>
                Watering Frequency: {plant.wateringTask.frequencyCount} time(s) a {plant.wateringTask.frequencyUnit} every {plant.wateringTask.frequencyInterval} day(s).
                <div>
                  <img src={plant.photoUrl} alt={`Image of ${plant.name}`}  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No plants to display.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;