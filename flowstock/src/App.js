import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Suppliers from "./pages/Suppliers";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";

export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "products": return <Products />;
      case "suppliers": return <Suppliers />;
      case "transactions": return <Transactions />;
      case "reports": return <Reports />;
      default: return <Home />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
      <Sidebar onChangePage={setPage} />
      <div style={{ flex: 1, background: "#f1f1f1", padding: "30px" }}>
        {renderPage()}
      </div>
    </div>
  );
}


