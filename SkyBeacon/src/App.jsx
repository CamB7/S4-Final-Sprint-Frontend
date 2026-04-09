import { Navigate, Route, Routes } from 'react-router-dom';
import Aurora from './components/Aurora.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/login/Login.jsx';
import AdminDash from './pages/dashboards/AdminDash.jsx';
import FlightDash from './pages/dashboards/FlightDash.jsx';

function App() {
  return (
    <>
      <Aurora
        colorStops={['#7cff67', '#B19EEF', '#5227FF']}
        blend={0.5}
        amplitude={1.0}
        speed={1}
      />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/dashboard/admin"
          element={<AdminDash />}
        />
        <Route
          path="/dashboard/flight"
          element={<FlightDash />}
        />
      </Routes>
    </>
  );
}

export default App;
