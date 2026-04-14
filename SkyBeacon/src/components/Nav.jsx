import { Link } from "react-router-dom";
import logo from "../assets/SB.png";
import "./Nav.css";

const Nav = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="main-nav">
      <div>
        <img src={logo} alt="SkyBeacon Logo" className="nav-logo" />
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/flights">Flights</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/adminDashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/addFlight">Add Flight</Link>
            </li>
            <li onClick={onLogout} style={{ cursor: "pointer" }}>
              <a><span>Logout</span></a>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
