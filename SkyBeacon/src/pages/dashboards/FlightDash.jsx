import { useState } from 'react';
import '../../index.css';
import './FlightDash.css';

const FlightDash = ({ flights = [] }) => {
  const [activeTab, setActiveTab] = useState('arrivals');

  const formatDateTime = (dateString) => {
    if (!dateString) return 'TBD';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const filteredFlights = flights;

  console.log('Single flight object:', flights[0]);
  return (
    <div className="flight-dash-container">
      <div className="tabs">
        <button
          className={activeTab === 'arrivals' ? 'active-tab' : 'tab'}
          onClick={() => setActiveTab('arrivals')}
        >
          Arrivals
        </button>
        <button
          className={activeTab === 'departures' ? 'active-tab' : 'tab'}
          onClick={() => setActiveTab('departures')}
        >
          Departures
        </button>
      </div>

      <table className="flight-table">
        <thead>
          <tr>
            <th>Flight #</th>
            <th>Airline</th>
            <th>Scheduled Time</th>
            <th>Actual Time</th>
            <th>{activeTab === 'arrivals' ? 'From' : 'To'}</th>
            <th>Gate</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredFlights.length > 0 ? (
            filteredFlights.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.flightNumber}</td>
                <td>{flight.airlineName || 'N/A'}</td>
                <td>
                  {activeTab === 'arrivals'
                    ? formatDateTime(flight.scheduledArrival)
                    : formatDateTime(flight.scheduledDeparture)}
                </td>
                <td>
                  {activeTab === 'arrivals'
                    ? formatDateTime(flight.actualArrival)
                    : formatDateTime(flight.actualDeparture)}
                </td>
                <td>
                  {activeTab === 'arrivals'
                    ? flight.departureAirportCode || 'N/A'
                    : flight.arrivalAirportCode || 'N/A'}
                </td>
                <td>
                  {activeTab === 'arrivals'
                    ? flight.arrivalGateCode || 'TBD'
                    : flight.departureGateCode || 'TBD'}
                </td>
                <td className="status">{flight.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="no-flights"
              >
                No {activeTab} available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FlightDash;
