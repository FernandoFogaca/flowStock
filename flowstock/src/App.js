import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Suppliers from "./pages/Suppliers";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel"; // ✅ novo painel do admin

export default function App() {
  const [page, setPage] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Carrega usuário e tema salvos
  useEffect(() => {
    const savedUser = localStorage.getItem("loggedUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setDarkMode(true);
      document.body.style.background = "#1e1e1e";
      document.body.style.color = "#f1f1f1";
    }
  }, []);

  // ✅ Alterna o tema e salva no localStorage
  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("darkMode", newTheme);
    document.body.style.background = newTheme ? "#1e1e1e" : "#f5f5f5";
    document.body.style.color = newTheme ? "#f1f1f1" : "#333";
  };

  // ✅ Faz login e salva o usuário
  const handleLogin = (loggedUser) => {
    setUser(loggedUser);
  };

  // ✅ Faz logout
  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
  };

  // ✅ Renderiza a página atual
  const renderPage = () => {
    switch (page) {
      case "home": return <Home navigate={setPage} darkMode={darkMode} />;
      case "products": return <Products darkMode={darkMode} />;
      case "suppliers": return <Suppliers darkMode={darkMode} />;
      case "transactions": return <Transactions darkMode={darkMode} />;
      case "reports": return <Reports darkMode={darkMode} />;
      case "admin": 
        return user?.role === "admin" 
          ? <AdminPanel darkMode={darkMode} /> 
          : <Home navigate={setPage} darkMode={darkMode} />;
      default: return <Home navigate={setPage} darkMode={darkMode} />;
    }
  };

  // ✅ Estilo principal do app
  const appStyle = {
    display: "flex",
    background: darkMode ? "#1e1e1e" : "#f5f5f5",
    color: darkMode ? "#f5f5f5" : "#333",
    minHeight: "100vh",
    transition: "0.3s",
  };

  // ✅ Se não estiver logado → mostra tela de login
  if (!user) {
    return <Login onLogin={handleLogin} darkMode={darkMode} toggleTheme={toggleTheme} />;
  }

  // ✅ Se estiver logado → mostra sistema
  return (
    <div style={appStyle}>
      {/* ✅ Passa o usuário logado pro Sidebar */}
      <Sidebar navigate={setPage} page={page} darkMode={darkMode} user={user} />

      <div style={{ flex: 1, padding: "20px" }}>
        {/* Topo do sistema */}
        <div style={{ 
          textAlign: "right", 
          marginBottom: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span style={{ fontWeight: "bold" }}>Welcome, {user.name}</span>

          <div>
            {/* Botão de tema */}
            <button
              onClick={toggleTheme}
              style={{
                background: darkMode ? "steelblue" : "white",
                color: darkMode ? "white" : "steelblue",
                border: "1px solid steelblue",
                borderRadius: "4px",
                padding: "6px 12px",
                cursor: "pointer",
                fontWeight: "bold",
                marginRight: "8px",
              }}
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            {/* Botão de logout */}
            <button
              onClick={handleLogout}
              style={{
                background: "steelblue",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Conteúdo da página */}
        {renderPage()}
      </div>
    </div>
  );
}
