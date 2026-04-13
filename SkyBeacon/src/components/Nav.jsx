import { Link } from "react-router-dom";
import logo from "../assets/SB.png";
import "./Nav.css";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Nav = () => {
  const { isLoggedIn, logout } = useContext(UserContext);

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
            <li onClick={logout} style={{ cursor: "pointer" }}>
              <a>Logout</a>
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
