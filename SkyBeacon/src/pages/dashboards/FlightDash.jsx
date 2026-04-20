import { useState, useEffect } from "react";
import AirportsDropdown from "../../components/AirportsDropdown";
import "./FlightDash.css";
import Button from "../../components/Button";

const FlightDash = ({ flights = [] }) => {
  const [activeTab, setActiveTab] = useState("arrivals");
  const [selectedAirport, setSelectedAirport] = useState(null);

  const fetchAirports = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/airports`, {
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
    <div className="flight-dash-container">
      <div className="title-container">
        <h2>FLIGHTS</h2>
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
        <div className="dropdown-container">
          <AirportsDropdown
            fetchItems={fetchAirports}
            onSelect={setSelectedAirport}
          />
        </div>
      </div>

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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-flights">
                No {activeTab} available for{" "}
                {selectedAirport || "this selection"}.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FlightDash;
