import "../../index.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import "./AdminDash.css";
import AirportsDropdown from "../../components/AirportsDropdown";

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
    return data.map((airport) => airport.name);
  } catch (error) {
    console.error("Error fetching airports:", error);
    return [];
  }
};

const AdminDash = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="title-container">
        <h2>ADMIN DASHBOARD </h2>
        <div className="buttons-container">
          <AirportsDropdown fetchItems={fetchAirports} />
          <Button
            text={"ADD FLIGHT"}
            onClick={() => navigate("/AddFlight", { replace: true })}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
