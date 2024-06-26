import React from 'react';
import { useToggle } from '../utils/ToggleContext';
import { Link, useLocation } from 'react-router-dom';
import navLogo from '../assets/images/plantplanner-hor-0.5x.png';
import Auth from '../utils/auth';

function Navbar() {
  const currentPage = useLocation().pathname;
  const { showDropdownMenu } = useToggle();
  const logout = (event) => {
    event.preventDefault();
    
    Auth.logout();
    window.location.href = '/';
    
  };

  return (
    <>
<div className="navbarStyles w3-container no-padding">

{/* nav logo links to home page */}
  <div className="nav-links w3-col s12 m6 l4 w3-padding-small">
   <Link
          to="/"
          className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
        >
          <img src={navLogo} className="navLogo no-padding" alt='Forget-Me-Not Plant Planner' />
      </Link>
  </div>
  {/* nav links to add a plant, view tasks, and logout button */}
  <div className="nav-links navbarStyles w3-row w3-col s12 m6 l8 no-padding">

    <div className="w3-cell nav-item">
        <Link
          to="/me"
          className={currentPage === '/me' ? 'nav-link active' : 'nav-link'}>
          <p className="w3-btn w3-large btn-light">My Dashboard</p>
        </Link>
      </div>

      <div className="w3-cell nav-item">
      <button className="w3-btn w3-large btn-light" onClick={showDropdownMenu}>Add to Garden</button>
      {/* Other navbar content */}
     </div>

      <div className="w3-cell nav-item">
        {/* <!--Replace '/' with route to the task list and calendar--> */}
        <Link
          to="/tasklist"
          className={currentPage === '/tasklist' ? 'nav-link active' : 'nav-link'} >
        <p className="w3-btn w3-large btn-light">View My Tasks</p>
        </Link>
      </div>

     {/*  <li className="nav-item">
        <Link
          to="/me"
          className={currentPage === '/me' ? 'nav-link active' : 'nav-link'}>
          My Profile
        </Link>
      </li> */}

      <div className="w3-cell nav-item w3-margin-left">
        <button className="w3-btn w3-large btn-light" onClick={logout}>
        Logout
        </button>
      </div>

    </div>

  </div>
</>
  );
}

export default Navbar;
