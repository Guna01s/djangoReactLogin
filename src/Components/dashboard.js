import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          alignItems: "center",
          marginTop: "15%",
          color: "white",
        }}
      >
        <h2>Welcome to the Dashboard</h2>

        {/* Logout button */}
      </div>
      <button
        style={{
          marginTop: "10px",
          width: "320px",
          borderRadius: "5px",
          padding: "5px",
          backgroundColor: "#288688",
          border: "none",
          color: "white",
          fontWeight: "600",
          fontSize: "16px",
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
