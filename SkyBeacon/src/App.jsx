import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Aurora from "./components/Aurora.jsx";
import Nav from "./components/Nav.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import AdminDash from "./pages/dashboards/AdminDash.jsx";
import FlightDash from "./pages/dashboards/FlightDash.jsx";
import AddFlight from "./components/AddFlight.jsx";

function App() {
  const [flights, setFlights] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLoggedIn");
    if (storedLoginState === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userData) => {
    console.log("Sending login request:", userData);
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userData.username,
        password: userData.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid login credentials");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login successful:", data);
        setIsLoggedIn(true);
        setUser(data);
        localStorage.setItem("isLoggedIn", "true");
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Login failed. Please check your credentials.");
      });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("isLoggedIn");
  };

  useEffect(() => {
    fetch("http://localhost:8080/flights")
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
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/adminDashboard" replace />
              ) : (
                <Home flights={flights} />
              )
            }
          />
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
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/flights" element={<FlightDash flights={flights} />} />
          <Route path="/addFlight" element={<AddFlight />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
