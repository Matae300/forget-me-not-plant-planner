import { Link, useLocation } from 'react-router-dom';
import navLogo from '../assets/images/plantplanner-hor-0.5x.png';


function Navbar() {
  const currentPage = useLocation().pathname;
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <>
<div className="navbarStyles w3-container">

  <div className="w3-col s12 m6 l6 no-padding test">
    <img src={navLogo} className="navLogo" alt='Forget-Me-Not Plant Planner' />
  </div> 

  <div className="w3-col s12 m6 l6 nav-links test">
    <ul className="navbar">
      <li className="nav-item">
        <Link
          to="/"
          className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
        >
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/plants"
          className={currentPage === '/plants' ? 'nav-link active' : 'nav-link'}
        >
          My Garden
        </Link>
      </li>
      <li className="nav-item">
        {/* <!--Replace '/' with route to the task list and calendar--> */}
        <Link
          to="/"
          className={currentPage === '/me' ? 'nav-link active' : 'nav-link'}
        >
          My Tasks
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/me"
          className={currentPage === '/me' ? 'nav-link active' : 'nav-link'}
        >
          My Profile
        </Link>
      </li>
      <li className="nav-item">
        <button className="w3-btn btn-lg btn-light m-2" onClick={logout}>
            Logout
        </button>
      </li>
    </ul>
    </div>

  </div>
</>
  );
}

export default Navbar;
