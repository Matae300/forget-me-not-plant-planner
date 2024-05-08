import { Link, useLocation } from 'react-router-dom';


function NavTabs() {
  const currentPage = useLocation().pathname;

  return (
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
  );
}

export default NavTabs;
