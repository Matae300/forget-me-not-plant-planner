// import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';
import Header from '../components/Header';
import Garden from '../components/Garden';
import Footer from '../components/Footer';

// Error handling
const Profile = () => {
  const { username: userParam } = useParams();
  console.log('userParam:', userParam);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  console.log('User data:', user);

  if (
    Auth.loggedIn() && user.username === userParam
    /* TODO: Check if the user's username is strictly equal to the userParam variable's value */
  ) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to sign up or log in!
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
// Profile Page Successful Render
  console.log('Rendering profile page', user.username);

  return (
<>
<header className="w3-container w3-sand">
<Header />
</header>

<main className="w3-row test">

    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
        {user.username}'s profile
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
     <Footer />
</footer>
 </>
  );
}

export default Profile;