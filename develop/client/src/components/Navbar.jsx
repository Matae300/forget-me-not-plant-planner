import { Link, useLocation } from 'react-router-dom';
import navLogo from '../assets/images/plantplanner-hot-0.5x.png';



function NavTabs() {
  const currentPage = useLocation().pathname;

  return (
<div className="navbarStyles w3-container w3-row">
  
  <div className="w3-cell">
    <img className="w3-display-left" src={navLogo} alt='Forget-Me-Not Plant Planner' />
  </div> 

  <div className="w3-cell">
    <ul className="navbar w3-display-right">
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
          plants
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/me"
          className={currentPage === '/me' ? 'nav-link active' : 'nav-link'}
        >
          profile
        </Link>
      </li>
    </ul>
  </div>

</div>

  );
}

export default NavTabs;
