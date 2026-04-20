import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./EditFlight.css";

const EditFlight = ({ isLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [flightData, setFlightData] = useState(location.state?.flight || {});

  const [airports, setAirports] = useState([]);
  const [aircraftList, setAircraftList] = useState([]);

  const [departureGates, setDepartureGates] = useState([]);
  const [arrivalGates, setArrivalGates] = useState([]);

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn]);

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (!location.state?.flight) {
      navigate("/AdminDash", { replace: true });
    }

    fetch(`${import.meta.env.VITE_API_URL}/flights/${id}`, {
      credentials: "include"
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch flight data");
        }
        return response.json();
      })
      .then((data) => setFlightData(data))
      .catch((error) => {
        console.error("Error fetching flight data:", error);
        alert("Failed to load flight data.");
      });

    const fetchDropdownData = async () => {
      try {
        const fetchOptions = { credentials: "include" };

        const [airportsRes, aircraftRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/airports`, fetchOptions),
          fetch(`${import.meta.env.VITE_API_URL}/aircrafts`, fetchOptions),
        ]);

        if (airportsRes.ok) setAirports(await airportsRes.json());
        if (aircraftRes.ok) setAircraftList(await aircraftRes.json());
      } catch (error) {
        console.error("Error fetching form options:", error);
      }
    };

    fetchDropdownData();
  }, [location.state, navigate, id]);

  useEffect(() => {
    if (flightData.departureAirportCode && airports.length > 0) {
      const airport = airports.find(
        (a) => a.code === flightData.departureAirportCode,
      );
      if (airport) {
        fetch(`${import.meta.env.VITE_API_URL}/airports/${airport.id}/gates`, {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => setDepartureGates(data))
          .catch((err) =>
            console.error("Error fetching departure gates:", err),
          );
      }
    } else {
      setDepartureGates([]);
    }
  }, [flightData.departureAirportCode, airports]);

  useEffect(() => {
    if (flightData.arrivalAirportCode && airports.length > 0) {
      const airport = airports.find(
        (a) => a.code === flightData.arrivalAirportCode,
      );
      if (airport) {
        fetch(`${import.meta.env.VITE_API_URL}/airports/${airport.id}/gates`, {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => setArrivalGates(data))
          .catch((err) => console.error("Error fetching arrival gates:", err));
      }
    } else {
      setArrivalGates([]);
    }
  }, [flightData.arrivalAirportCode, airports]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFlightData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/flights/${flightData.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(flightData),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update flight");
      }

      alert("Flight updated successfully!");
      navigate("/AdminDashboard");
    } catch (error) {
      console.error("Error updating flight:", error);
      alert("Failed to update flight. Please try again.");
    }
  };

  return (
    <div className="edit-flight-container">
      <form className="glass-form" onSubmit={handleSubmit}>
        <h2 className="form-title">EDIT FLIGHT</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Airline</label>
            <input
              type="text"
              name="airlineName"
              value={flightData.airlineName || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Flight Number</label>
            <input
              type="text"
              name="flightNumber"
              value={flightData.flightNumber || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Aircraft</label>
            <select
              name="aircraftId"
              value={flightData.aircraftId || ""}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Aircraft
              </option>
              {aircraftList.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.tailNumber} - {a.type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Departing Airport (Code)</label>
            <select
              name="departureAirportCode"
              value={flightData.departureAirportCode || ""}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Airport
              </option>
              {airports.map((airport) => (
                <option key={airport.id} value={airport.code}>
                  {airport.code} - {airport.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Arriving Airport (Code)</label>
            <select
              name="arrivalAirportCode"
              value={flightData.arrivalAirportCode || ""}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Airport
              </option>
              {airports.map((airport) => (
                <option key={airport.id} value={airport.code}>
                  {airport.code} - {airport.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date of Departure</label>
            <input
              type="date"
              name="scheduledDeparture"
              value={flightData.scheduledDeparture?.split("T")[0] || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Time of Departure</label>
            <input
              type="time"
              name="scheduledDepartureTime"
              value={
                flightData.scheduledDeparture?.split("T")[1]?.slice(0, 5) || ""
              }
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date of Arrival</label>
            <input
              type="date"
              name="scheduledArrival"
              value={flightData.scheduledArrival?.split("T")[0] || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Time of Arrival</label>
            <input
              type="time"
              name="scheduledArrivalTime"
              value={
                flightData.scheduledArrival?.split("T")[1]?.slice(0, 5) || ""
              }
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Departure Gate</label>
            <select
              name="departureGateCode"
              value={flightData.departureGateCode || ""}
              onChange={handleInputChange}
            >
              <option value="">Select Gate</option>
              {departureGates.map((gate) => (
                <option key={gate.id} value={gate.code}>
                  {gate.code}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Arrival Gate</label>
            <select
              name="arrivalGateCode"
              value={flightData.arrivalGateCode || ""}
              onChange={handleInputChange}
            >
              <option value="">Select Gate</option>
              {arrivalGates.map((gate) => (
                <option key={gate.id} value={gate.code}>
                  {gate.code}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group full-width">
            <label>Status</label>
            <select
              name="status"
              value={flightData.status || ""}
              onChange={handleInputChange}
            >
              <option value="SCHEDULED">On Schedule</option>
              <option value="BOARDING">Boarding</option>
              <option value="DELAYED">Delayed</option>
              <option value="AT_GATE">At Gate</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>

        <button type="submit" className="submit-button">
          UPDATE FLIGHT
        </button>
      </form>
    </div>
  );
};

export default EditFlight;
