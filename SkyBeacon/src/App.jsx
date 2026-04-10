import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Aurora from './components/Aurora.jsx';
import Nav from './components/Nav.jsx';
import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import AdminDash from './pages/dashboards/AdminDash.jsx';
import FlightDash from './pages/dashboards/FlightDash.jsx';
import AddFlight from './components/AddFlight.jsx';

function App() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/flights')
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => setFlights(data))
      .catch((error) => console.error('Error fetching:', error));
  }, []);

  return (
    <div className="app-shell">
      <div className="app-background">
        <Aurora
          colorStops={['#25344F', '#632024', '#617891']}
          blend={0.5}
          amplitude={1.0}
          speed={1}
        />
      </div>

      <main className="app-content">
        <Nav />
        <Routes>
          <Route
            path="/"
            element={<Home flights={flights} />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/adminDashboard"
            element={<AdminDash />}
          />
          <Route
            path="/dashboard/flight"
            element={<FlightDash />}
          />
          <Route
            path="/admin/addFlight"
            element={<AddFlight />}
          />
          
          
        </Routes>
      </main>
    </div>
  );
}

export default App;
