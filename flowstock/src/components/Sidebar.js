
import React from "react";

 export default function Sidebar({ onChangePage }) {
  const btn = {
    background: "white",
    color: "steelblue",
    border: "1px solid steelblue",
    margin: "5px 0",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold"
  };

  return (
    <div style={{
      width: "220px",
      background: "steelblue",
      color: "white",
      display: "flex",
      flexDirection: "column",
      padding: "20px"
    }}>
      <h2 style={{ textAlign: "center" }}>FlowStock</h2>
      <button style={btn} onClick={() => onChangePage("home")}>Home</button>
      <button style={btn} onClick={() => onChangePage("products")}>Products</button>
      <button style={btn} onClick={() => onChangePage("suppliers")}>Suppliers</button>
      <button style={btn} onClick={() => onChangePage("transactions")}>Transactions</button>
      <button style={btn} onClick={() => onChangePage("reports")}>Reports</button>
    </div>
  );
}


