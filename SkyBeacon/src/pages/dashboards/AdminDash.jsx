import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import "./AdminDash.css";
import AirportsDropdown from "../../components/AirportsDropdown";
import { useState } from "react";

const AdminDash = ({ flights = [], isLoggedIn }) => {
  const [activeTab, setActiveTab] = useState("arrivals");
  const [selectedAirport, setSelectedAirport] = useState(null);
  const navigate = useNavigate();

  const deleteFlight = async (flightId, flightNumber) => {
    try {
      const response = await fetch(
        `http://localhost:8080/flights/${flightId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (response.ok) {
        alert(`Flight ${flightNumber} deleted successfully.`);
      } else {
        const errorData = await response.text();
        console.error("Failed to delete flight:", errorData);
        alert(`Failed to delete flight ${flightNumber} because of ${errorData}. Please try again.`);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error deleting flight:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn]);

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  const fetchAirports = async () => {
    try {
      const response = await fetch("http://localhost:8080/airports", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch airports");
      }

      const data = await response.json();
      return data.map((airport) => airport.code);
    } catch (error) {
      console.error("Error fetching airports:", error);
      return [];
    }
  };

  const formatStatus = (status) => {
    if (!status) return "N/A";
    if (status === "SCHEDULED") {
      status = "ON SCHEDULE";
    }
    return status.replace(/_/g, " ");
  };

  const getStatusClass = (status) => {
    if (!status) return "";
    return `status-${status.toLowerCase().replace(/_/g, "-")}`;
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const filteredFlights = flights.filter((flight) => {
    if (!selectedAirport || selectedAirport === "All Airports") return true;

  const targetAirport = String(selectedAirport).trim().toLowerCase();

    if (activeTab === "arrivals") {
      const arrCode = flight.arrivalAirportCode
        ? String(flight.arrivalAirportCode).trim().toLowerCase()
        : "";
      return arrCode === targetAirport;
    } else {
      const depCode = flight.departureAirportCode
        ? String(flight.departureAirportCode).trim().toLowerCase()
        : "";
      return depCode === targetAirport;
    }
  });

  return (
    <div className="admin-dash-container">
      <div className="title-container">
        <h2>ADMIN DASHBOARD</h2>
      </div>

      <div className="dash-controls">
        <div className="tabs">
          <Button
            className={activeTab === "arrivals" ? "active-tab" : "tab"}
            onClick={() => setActiveTab("arrivals")}
            text={"Arrivals"}
          />
          <Button
            className={activeTab === "departures" ? "active-tab" : "tab"}
            onClick={() => setActiveTab("departures")}
            text={"Departures"}
          />
        </div>

        <div className="buttons-container">
          <AirportsDropdown
            fetchItems={fetchAirports}
            onSelect={setSelectedAirport}
          />
          <Button
            text={"Add Flight"}
            onClick={() => navigate("/AddFlight", { replace: true })}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="flight-table">
          <thead>
            <tr>
              <th>Flight #</th>
              <th>Airline</th>
              <th>Scheduled Time</th>
              <th>Actual Time</th>
              <th>{activeTab === "arrivals" ? "From" : "To"}</th>
              <th>Gate</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFlights.length > 0 ? (
              filteredFlights.map((flight) => (
                <tr key={flight.id}>
                  <td>{flight.flightNumber || flight.id || "N/A"}</td>
                  <td>{flight.airlineName || "N/A"}</td>
                  <td>
                    {activeTab === "arrivals"
                      ? formatDateTime(flight.scheduledArrival)
                      : formatDateTime(flight.scheduledDeparture)}
                  </td>
                  <td>
                    {activeTab === "arrivals"
                      ? formatDateTime(flight.actualArrival)
                      : formatDateTime(flight.actualDeparture)}
                  </td>
                  <td>
                    {activeTab === "arrivals"
                      ? flight.departureAirportCode || "N/A"
                      : flight.arrivalAirportCode || "N/A"}
                  </td>
                  <td>
                    {activeTab === "arrivals"
                      ? flight.arrivalGateCode || "TBD"
                      : flight.departureGateCode || "TBD"}
                  </td>
                  <td className={`status ${getStatusClass(flight.status)}`}>
                    {formatStatus(flight.status)}
                  </td>
                  <td>
                    <svg
                      className="edit-icon"
                      style={{ marginRight: "1rem", cursor: "pointer" }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      onClick={() => navigate(`/EditFlight/${flight.id}`, { state: { flight } })}
                      alt="Edit Flight Icon"
                    >
                      <rect width="24" height="24" fill="none" />
                      <path
                        fill="#d6b896"
                        d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"
                      />
                    </svg>

                    <svg
                      className="delete-icon"
                      style={{ marginRight: "1rem", cursor: "pointer" }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      onClick={() =>
                        deleteFlight(flight.id, flight.flightNumber)
                      }
                      alt="Delete Flight Icon"
                    >
                      <rect width="24" height="24" fill="none" />
                      <path
                        fill="#d6b896"
                        d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                      />
                    </svg>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-flights">
                  No {activeTab} available for{" "}
                  {selectedAirport || "this selection"}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDash;
