import '../../index.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const AdminDash = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
``
  return (
    <div>
      <div>
        <h1>ADMIN DASHBOARD</h1>
        <Button
          text={"ADD FLIGHT"}
          onClick={() => navigate("/AddFlight", { replace: true })}
        />
      </div>
    </div>
  );
};

export default AdminDash;
