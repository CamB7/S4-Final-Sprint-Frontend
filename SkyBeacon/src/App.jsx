import { Route, Routes } from 'react-router-dom';
import Aurora from './components/Aurora.jsx';
import Nav from './components/Nav.jsx';
import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import AdminDash from './pages/dashboards/AdminDash.jsx';
import FlightDash from './pages/dashboards/FlightDash.jsx';

function App() {
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
      </main>
    </div>
  );
}

export default App;
