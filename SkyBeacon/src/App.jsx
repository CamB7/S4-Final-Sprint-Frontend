import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Aurora from "./components/Aurora.jsx";
import Nav from "./components/Nav.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import AdminDash from "./pages/dashboards/AdminDash.jsx";
import FlightDash from "./pages/dashboards/FlightDash.jsx";
import AddFlight from "./components/AddFlight.jsx";
import EditFlight from "./components/EditFlight.jsx";

function App() {
  const [flights, setFlights] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setIsLoggedIn(true);
        setUser(data);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUser(null);
      });
  }, []);

  const handleLogin = async (userData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userData.username,
            password: userData.password,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Invalid login credentials");
      }

      const data = await response.json();
      setIsLoggedIn(true);
      setUser(data);
      localStorage.setItem("isLoggedIn", "true");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const clearMessage = () => setMessage(null);

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("isLoggedIn");
    }
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/flights`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => setFlights(data))
      .catch((error) => console.error("Error fetching:", error));
  }, []);

  return (
    <div className="app-shell">
      <div className="app-background">
        <Aurora
          colorStops={["#25344F", "#632024", "#617891"]}
          blend={0.5}
          amplitude={1.0}
          speed={1}
        />
      </div>

      <main className="app-content">
        <Nav isLoggedIn={isLoggedIn} onLogout={handleLogout} />

        <Routes key={isLoggedIn}>
          <Route path="/" element={<Home flights={flights} />} />

          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/adminDashboard" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          <Route
            path="/adminDashboard"
            element={
              isLoggedIn ? (
                <AdminDash flights={flights} isLoggedIn={isLoggedIn} />
              ) : (
                <Navigate
                  to="/login"
                  state={{
                    message: "Please log in to access the admin dashboard.",
                    from: location,
                  }}
                  replace
                />
              )
            }
          />

          <Route path="/flights" element={<FlightDash flights={flights} />} />
          <Route
            path="/addFlight"
            element={
              isLoggedIn ? (
                <AddFlight isLoggedIn={isLoggedIn} />
              ) : (
                <Navigate
                  to="/login"
                  state={{
                    message: "Please log in to add flights.",
                    from: location,
                  }}
                  replace
                />
              )
            }
          />
          <Route
            path="/editFlight/:id"
            element={
              isLoggedIn ? (
                <EditFlight isLoggedIn={isLoggedIn} />
              ) : (
                <Navigate
                  to="/login"
                  state={{
                    message: "Please log in to edit flights.",
                    from: location,
                  }}
                  replace
                />
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
