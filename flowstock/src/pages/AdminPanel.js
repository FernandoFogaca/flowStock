import React, { useState, useEffect } from "react";

export default function AdminPanel({ darkMode }) {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [history, setHistory] = useState([]);

  // carregar dados salvos
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);

    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(savedHistory);
  }, []);

  // salvar novo funcionário
  const addUser = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    addHistory(`New user registered: ${name} (${role})`);

    setName("");
    setEmail("");
    setPassword("");
    setRole("employee");
  };

  // excluir funcionário
  const deleteUser = (id) => {
    const user = users.find((u) => u.id === id);
    if (window.confirm(`Delete ${user.name}?`)) {
      const updated = users.filter((u) => u.id !== id);
      setUsers(updated);
      localStorage.setItem("users", JSON.stringify(updated));
      addHistory(`User deleted: ${user.name}`);
    }
  };

  // registrar ação no histórico
  const addHistory = (action) => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    const newEntry = {
      id: Date.now(),
      user: user?.name || "Unknown",
      action,
      date: new Date().toLocaleString(),
    };
    const updated = [...history, newEntry];
    setHistory(updated);
    localStorage.setItem("history", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "steelblue" }}>Admin Panel</h2>
      <p>Manage employees and see all system actions.</p>

      {/* form new user */}
      <form onSubmit={addUser} style={formStyle}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" style={btnAdd}>
          Add User
        </button>
      </form>

      {/* users table */}
      <h3>Registered Users</h3>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table style={tableStyle}>
          <thead style={{ background: "steelblue", color: "white" }}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button style={btnDel} onClick={() => deleteUser(u.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* history table */}
      <h3 style={{ marginTop: "40px" }}>System History</h3>
      {history.length === 0 ? (
        <p>No actions recorded yet.</p>
      ) : (
        <table style={tableStyle}>
          <thead style={{ background: "steelblue", color: "white" }}>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h) => (
              <tr key={h.id}>
                <td>{h.user}</td>
                <td>{h.action}</td>
                <td>{h.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

/* --- styles --- */
const formStyle = {
  display: "grid",
  gap: "10px",
  maxWidth: "400px",
  marginBottom: "30px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "20px",
};

const btnAdd = {
  background: "steelblue",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
};

const btnDel = {
  background: "white",
  color: "steelblue",
  border: "1px solid steelblue",
  padding: "5px 10px",
  borderRadius: "4px",
  cursor: "pointer",
};
