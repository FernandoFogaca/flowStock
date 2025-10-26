import React from "react";
import { 
  FaHome, 
  FaBox, 
  FaTruck, 
  FaExchangeAlt, 
  FaChartBar, 
  FaUserShield 
} from "react-icons/fa";

export default function Sidebar({ navigate, page, darkMode, user }) {
  const sidebarStyle = {
    width: "200px",
    background: darkMode ? "#2a2a2a" : "white",
    color: darkMode ? "#f5f5f5" : "#333",
    padding: "20px",
    borderRight: darkMode ? "1px solid #444" : "1px solid #ddd",
    transition: "0.3s",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const buttonStyle = (isActive) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px",
    marginBottom: "10px",
    cursor: "pointer",
    borderRadius: "6px",
    background: isActive
      ? "steelblue"
      : (darkMode ? "#3a3a3a" : "transparent"),
    color: isActive ? "white" : darkMode ? "#ddd" : "#333",
    border: "none",
    width: "100%",
    textAlign: "left",
    fontWeight: isActive ? "bold" : "normal",
    transition: "0.2s",
  });

  const footerStyle = {
    fontSize: "0.8rem",
    color: darkMode ? "#aaa" : "#777",
    textAlign: "center",
    marginTop: "10px",
    borderTop: darkMode ? "1px solid #444" : "1px solid #ddd",
    paddingTop: "10px",
  };

  return (
    <div style={sidebarStyle}>
      <div>
        <h2 style={{ color: "steelblue", marginBottom: "20px" }}>FlowStock</h2>

        <button style={buttonStyle(page === "home")} onClick={() => navigate("home")}>
          <FaHome /> Home
        </button>

        <button style={buttonStyle(page === "products")} onClick={() => navigate("products")}>
          <FaBox /> Products
        </button>

        <button style={buttonStyle(page === "suppliers")} onClick={() => navigate("suppliers")}>
          <FaTruck /> Suppliers
        </button>

        <button style={buttonStyle(page === "transactions")} onClick={() => navigate("transactions")}>
          <FaExchangeAlt /> Transactions
        </button>

        <button style={buttonStyle(page === "reports")} onClick={() => navigate("reports")}>
          <FaChartBar /> Reports
        </button>

        {/* Botão do painel administrativo (somente para admin) */}
        {user?.role === "admin" && (
          <button style={buttonStyle(page === "admin")} onClick={() => navigate("admin")}>
            <FaUserShield /> Admin Panel
          </button>
        )}
      </div>

      <div style={footerStyle}>
        <p>© {new Date().getFullYear()} FlowStock</p>
      </div>
    </div>
  );
}
