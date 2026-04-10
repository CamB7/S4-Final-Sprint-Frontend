import { Link } from 'react-router-dom';
import logo from '../assets/SB.png';
import './Nav.css';

const Nav = () => {
  return (
    <nav className="main-nav">
      <div>
        <img
          src={logo}
          alt="SkyBeacon Logo"
          className="nav-logo"
        />
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard/flight">Flights</Link>
        </li>
        <li>
          <Link to="/dashboard/admin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
