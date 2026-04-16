import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './AddFlight.css';

const AddFlight = ({isLoggedIn}) => {
  const [formData, setFormData] = useState({
    airlineName: '',
    flightNumber: '',
    aircraftId: '',
    departureAirport: '',
    arrivalAirport: '',
    departureDate: '',
    departureTime: '',
    arrivalDate: '',
    arrivalTime: '',
    departureGate: '',
    arrivalGate: '',
    status: 'SCHEDULED',
  });

  const [airports, setAirports] = useState([]);
  const [aircraftList, setAircraftList] = useState([]);

  const [departureGates, setDepartureGates] = useState([]);
  const [arrivalGates, setArrivalGates] = useState([]);

  const navigate = useNavigate();

      useEffect(() => {
        if (isLoggedIn === false) {
          navigate("/login", { replace: true });
        }
      }, [isLoggedIn]);
    
      if (isLoggedIn === null) {
        return <div>Loading...</div>;
      }

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const fetchOptions = { credentials: 'include' };

        const [airportsRes, aircraftRes] = await Promise.all([
          fetch('http://localhost:8080/airports', fetchOptions),
          fetch('http://localhost:8080/aircrafts', fetchOptions),
        ]);

        if (airportsRes.ok) setAirports(await airportsRes.json());
        if (aircraftRes.ok) setAircraftList(await aircraftRes.json());
      } catch (error) {
        console.error('Error fetching form options:', error);
      }
    };

    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (formData.departureAirport && airports.length > 0) {
      // Find the airport ID using the selected code
      const airport = airports.find(
        (a) => a.code === formData.departureAirport
      );
      if (airport) {
        fetch(`http://localhost:8080/airports/${airport.id}/gates`, {
          credentials: 'include',
        })
          .then((res) => res.json())
          .then((data) => setDepartureGates(data))
          .catch((err) =>
            console.error('Error fetching departure gates:', err)
          );
      }
    } else {
      setDepartureGates([]);
    }
  }, [formData.departureAirport, airports]);

  useEffect(() => {
    if (formData.arrivalAirport && airports.length > 0) {
      const airport = airports.find((a) => a.code === formData.arrivalAirport);
      if (airport) {
        fetch(`http://localhost:8080/airports/${airport.id}/gates`, {
          credentials: 'include',
        })
          .then((res) => res.json())
          .then((data) => setArrivalGates(data))
          .catch((err) => console.error('Error fetching arrival gates:', err));
      }
    } else {
      setArrivalGates([]);
    }
  }, [formData.arrivalAirport, airports]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      flightNumber: formData.flightNumber,
      airlineName: formData.airlineName,
      departureAirportCode: formData.departureAirport,
      arrivalAirportCode: formData.arrivalAirport,
      scheduledDeparture: `${formData.departureDate}T${formData.departureTime}:00`,
      scheduledArrival: `${formData.arrivalDate}T${formData.arrivalTime}:00`,
      departureGateCode: formData.departureGate,
      arrivalGateCode: formData.arrivalGate,
      status: formData.status,
      aircraftId: parseInt(formData.aircraftId, 10), // Must send as number
    };

    console.log('Submitting transformed flight data:', payload);

    try {
      const response = await fetch('http://localhost:8080/flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Flight added successfully!');
        setFormData({
          airlineName: '',
          flightNumber: '',
          aircraftId: '',
          departureAirport: '',
          arrivalAirport: '',
          departureDate: '',
          departureTime: '',
          arrivalDate: '',
          arrivalTime: '',
          departureGate: '',
          arrivalGate: '',
          status: 'SCHEDULED',
        });
      } else {
        const errorData = await response.text();
        console.error('Server returned 400 Bad Request:', errorData);
        alert(`Failed to add flight: ${errorData}`);
      }
    } catch (error) {
      console.error('Network Error:', error);
    }
  };

  return (
    <div className="add-flight-container">
      <form
        className="glass-form"
        onSubmit={handleSubmit}
      >
        <h2 className="form-title">ADD NEW FLIGHT</h2>

        <div className="form-grid">
          <div className="form-group">
            <label>Airline</label>
            <input
              type="text"
              name="airlineName"
              value={formData.airlineName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Flight Number</label>
            <input
              type="text"
              name="flightNumber"
              value={formData.flightNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Aircraft</label>
            <select
              name="aircraftId"
              value={formData.aircraftId}
              onChange={handleChange}
              required
            >
              <option
                value=""
                disabled
              >
                Select Aircraft
              </option>
              {aircraftList.map((a) => (
                <option
                  key={a.id}
                  value={a.id}
                >
                  {a.tailNumber} - {a.type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Departing Airport (Code)</label>
            <select
              name="departureAirport"
              value={formData.departureAirport}
              onChange={handleChange}
              required
            >
              <option
                value=""
                disabled
              >
                Select Airport
              </option>
              {airports.map((airport) => (
                <option
                  key={airport.id}
                  value={airport.code}
                >
                  {airport.code} - {airport.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Arriving Airport (Code)</label>
            <select
              name="arrivalAirport"
              value={formData.arrivalAirport}
              onChange={handleChange}
              required
            >
              <option
                value=""
                disabled
              >
                Select Airport
              </option>
              {airports.map((airport) => (
                <option
                  key={airport.id}
                  value={airport.code}
                >
                  {airport.code} - {airport.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date of Departure</label>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Time of Departure</label>
            <input
              type="time"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date of Arrival</label>
            <input
              type="date"
              name="arrivalDate"
              value={formData.arrivalDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Time of Arrival</label>
            <input
              type="time"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Departure Gate</label>
            <select
              name="departureGate"
              value={formData.departureGate}
              onChange={handleChange}
            >
              <option value="">Select Gate</option>
              {departureGates.map((gate) => (
                <option
                  key={gate.id}
                  value={gate.code}
                >
                  {gate.code}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Arrival Gate</label>
            <select
              name="arrivalGate"
              value={formData.arrivalGate}
              onChange={handleChange}
            >
              <option value="">Select Gate</option>
              {arrivalGates.map((gate) => (
                <option
                  key={gate.id}
                  value={gate.code}
                >
                  {gate.code}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group full-width">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="SCHEDULED">On Schedule</option>
              <option value="BOARDING">Boarding</option>
              <option value="DELAYED">Delayed</option>
              <option value="AT_GATE">At Gate</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="submit-button"
        >
          ADD FLIGHT
        </button>
      </form>
    </div>
  );
};

export default AddFlight;
