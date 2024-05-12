import { Link } from 'react-router-dom';

import Auth from '../utils/auth';
import Navbar from '../components/Navbar';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <>
    <div className="w3-container w3-row no-padding">
      <div className="w3-cell no-padding">
        <Navbar />
      </div>
      <div className="w3-cell">
        <button className="btn btn-lg btn-light m-2" onClick={logout}>
            Logout
        </button>
      </div>
    </div>
    </>
  );
};

export default Header;
