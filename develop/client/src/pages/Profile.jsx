import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';



import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

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
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  console.log('Rendering profile page', user.username);
  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {user.username}'s` profile.
        </h2>
      </div>
    </div>
  );
};

export default Profile;