import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";
import Dropdown from '../components/Dropdown'
import Navbar from "../components/Navbar";
import Garden from "../components/Garden";
import Footer from "../components/Footer";
import TaskList from "../components/TaskList/taskList"

// Error handling
const Profile = () => {
  const { username } = useParams();

  const {loading, error, data} = useQuery(QUERY_ME)
  const profile = data?.me || data?.profile || {};

  if (Auth.loggedIn() && Auth.getProfile().data._id === username) {
    return <Navigate to="/me"/>;
  }
  console.log("User data:", profile);

  if (loading) {
    console.log("Still loading data");
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("GraphQL Error:", error);
    return <p>Error loading profile.</p>;
  }
  // Profile Page Successful Render
  console.log("Rendering profile page", profile.username);

  return (
    <>
      {Auth.loggedIn() ? (
        <div>
          <header className="w3-container w3-sand">
            <Navbar />
          </header>

          <main className="w3-row test">
            <div>
              <div className="flex-row justify-center mb-3">
                <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
                  {profile.username}'s profile
                </h2>
              </div>

              <div>
                <Dropdown userId={profile._id} />
              </div>

              <div id="garden" className="w3-container w3-col s4 m6 l8">
                {/* below could be the garden component, would just need to pass it the profile data,  ex. <Garden data={profile} /> */}
                <Garden data={profile}/>
              </div>

              <div className="w3-container w3-col s8 m6 l4">
                <div id="my-tasks" className="w3-brown myTasksStyle">
                  <TaskList />
                </div>
              </div>
            </div>
          </main>

          <footer className="w3-container">
            <Footer />
          </footer>
        </div>
      ) : (
        <div>
          <h4>
            You need to be logged in to see this. Use the navigation links above
            to sign up or log in!
          </h4>
        </div>
      )}
    </>
  );
};

export default Profile;