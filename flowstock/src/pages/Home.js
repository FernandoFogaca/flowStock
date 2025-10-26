import React from "react";
import { FaBox, FaTruck, FaExchangeAlt, FaChartBar } from "react-icons/fa";

export default function Home({ navigate, darkMode }) {
  const bgColor = darkMode ? "#1e1e1e" : "white";
  const textColor = darkMode ? "#f5f5f5" : "#333";
  const cardBg = darkMode ? "#2b2b2b" : "#f9f9f9";
  const cardText = darkMode ? "#e0e0e0" : "#333";
  const subtitleColor = darkMode ? "#ccc" : "#666";

  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        color: textColor,
        background: bgColor,
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        transition: "0.3s"
      }}
    >
      <h1 style={{ color: "steelblue", fontSize: "2.5rem", marginBottom: "10px" }}>
        FlowStock
      </h1>
      <p style={{ fontSize: "1.1rem", color: subtitleColor, marginBottom: "40px" }}>
        Simple and smart inventory management system
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div style={{ ...cardStyle(cardBg, cardText) }} onClick={() => navigate("products")}>
          <FaBox style={icon} />
          <h3>Products</h3>
          <p>Register and manage all products</p>
        </div>

        <div style={{ ...cardStyle(cardBg, cardText) }} onClick={() => navigate("suppliers")}>
          <FaTruck style={icon} />
          <h3>Suppliers</h3>
          <p>Control suppliers and contacts</p>
        </div>

        <div style={{ ...cardStyle(cardBg, cardText) }} onClick={() => navigate("transactions")}>
          <FaExchangeAlt style={icon} />
          <h3>Transactions</h3>
          <p>Track product movements</p>
        </div>

        <div style={{ ...cardStyle(cardBg, cardText) }} onClick={() => navigate("reports")}>
          <FaChartBar style={icon} />
          <h3>Reports</h3>
          <p>View stock statistics and charts</p>
        </div>
      </div>
    </div>
  );
}

/* --- styles --- */
const cardStyle = (bg, color) => ({
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "20px",
  cursor: "pointer",
  transition: "0.3s",
  background: bg,
  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  color,
});

const icon = {
  fontSize: "2rem",
  color: "steelblue",
  marginBottom: "10px"
};
