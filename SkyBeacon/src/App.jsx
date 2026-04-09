import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/login-signup/Login.jsx';
import Register from './pages/login-signup/Register.jsx';
import AdminDash from './pages/dashboards/AdminDash.jsx';
import FlightDash from './pages/dashboards/FlightDash.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard/admin" element={<AdminDash />} />
      <Route path="/dashboard/flight" element={<FlightDash />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
