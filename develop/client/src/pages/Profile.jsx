// import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Dropdown from '../components/Dropdown';
import Auth from '../utils/auth';
import Header from '../components/Header';
import Garden from '../components/Garden';
import footerGround from '../assets/images/footerGround.png';

const Profile = () => {
  if (!Auth.loggedIn()) {
    console.log('No username available, user might not be logged in');
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  };
  
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
<>
<header className="w3-container w3-white">
<Header />
</header>

<main className="w3-row w3-row-padding w3-sand">

    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {user.username}'s` profile.
        </h2>
      </div>

    <div>
      <Dropdown userId={user._id}/>
    </div>

      <div id="garden" className="w3-container w3-col s4 m6 l8">
      {/* below could be the garden component, would just need to pass it the user data,  ex. <Garden data={user} /> */}
        <Garden data={user} />
      </div>

      <div className="w3-container w3-col s8 m6 l4"> 

        <div id="my-tasks" className="w3-brown myTasksStyle">
          {/* Replace with myTasks component */}
          <h2>My Tasks Go Here</h2>
          <p>Test</p>
        </div>

     </div>

    </div>

</main>

<footer className="w3-container">
      <img src={footerGround} alt="footer ground" className="footerStyle"/>
      <p className="footerTextStyle">Brought to you by Project 3 Superstars, Plant Care Division</p>
</footer>

 </>
  );}

export default Profile;