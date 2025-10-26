import React, { useState, useEffect } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // cria admin padrão se não existir
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (savedUsers.length === 0) {
      const admin = {
        id: Date.now(),
        name: "Admin",
        email: "admin@flowstock.com",
        password: "1234",
        role: "admin",
      };
      localStorage.setItem("users", JSON.stringify([admin]));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
      onLogin(user); // avisa o App que logou
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div style={container}>
      <h2 style={{ color: "steelblue" }}>FlowStock Login</h2>
      <p>Please log in to access the system.</p>

      <form onSubmit={handleLogin} style={formStyle}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={btnLogin}>
          Login
        </button>
      </form>

      <p style={{ fontSize: "0.9rem", color: "#555" }}>
        Default admin: admin@flowstock.com / 1234
      </p>
    </div>
  );
}

/* --- styles --- */
const container = {
  maxWidth: "400px",
  margin: "80px auto",
  padding: "30px",
  background: "white",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const formStyle = {
  display: "grid",
  gap: "10px",
  marginTop: "20px",
};

const btnLogin = {
  background: "steelblue",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
};
