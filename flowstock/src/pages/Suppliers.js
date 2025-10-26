import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function Suppliers({ darkMode }) {
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [productsSupplied, setProductsSupplied] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const addSupplier = (e) => {
    e.preventDefault();

    if (!name || !phone || !email || !productsSupplied || !address || !city || !state || !postalCode) {
      alert("Please fill all fields");
      return;
    }

    const newSupplier = {
      id: Date.now(),
      name,
      phone,
      email,
      productsSupplied,
      address,
      city,
      state,
      postalCode
    };

    setSuppliers([...suppliers, newSupplier]);

    // clear fields
    setName("");
    setPhone("");
    setEmail("");
    setProductsSupplied("");
    setAddress("");
    setCity("");
    setState("");
    setPostalCode("");
  };

  const deleteSupplier = (id) => {
    setSuppliers(suppliers.filter((s) => s.id !== id));
  };

  const bgColor = darkMode ? "#1e1e1e" : "white";
  const textColor = darkMode ? "#f5f5f5" : "#333";
  const tableBg = darkMode ? "#2b2b2b" : "#f9f9f9";

  return (
    <div>
      <h2 style={{ color: "steelblue" }}>Suppliers</h2>
      <p>Register and manage your suppliers here.</p>

      <form
        onSubmit={addSupplier}
        style={{
          display: "grid",
          gap: "10px",
          maxWidth: "450px",
          marginBottom: "20px"
        }}
      >
        <input
          type="text"
          placeholder="Supplier name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Products supplied (e.g. Cement, Paint, Screws)"
          value={productsSupplied}
          onChange={(e) => setProductsSupplied(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address (Street, number, complement)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          placeholder="Postal code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />

        <button
          type="submit"
          style={{
            background: "steelblue",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          <FaPlus /> Add Supplier
        </button>
      </form>

      {suppliers.length === 0 ? (
        <p>No suppliers added yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: tableBg,
            color: textColor
          }}
        >
          <thead style={{ background: "steelblue", color: "white" }}>
            <tr>
              <th style={th}>Name</th>
              <th style={th}>Phone</th>
              <th style={th}>Email</th>
              <th style={th}>Products</th>
              <th style={th}>Address</th>
              <th style={th}>City</th>
              <th style={th}>State</th>
              <th style={th}>Postal code</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s) => (
              <tr key={s.id}>
                <td style={td}>{s.name}</td>
                <td style={td}>{s.phone}</td>
                <td style={td}>{s.email}</td>
                <td style={td}>{s.productsSupplied}</td>
                <td style={td}>{s.address}</td>
                <td style={td}>{s.city}</td>
                <td style={td}>{s.state}</td>
                <td style={td}>{s.postalCode}</td>
                <td style={td}>
                  <button style={btnDel} onClick={() => deleteSupplier(s.id)}>
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th = {
  textAlign: "left",
  padding: "8px",
  borderBottom: "2px solid #ddd"
};

const td = {
  padding: "8px",
  borderBottom: "1px solid #ddd"
};

const btnDel = {
  background: "white",
  color: "steelblue",
  border: "1px solid steelblue",
  padding: "4px 8px",
  borderRadius: "4px",
  cursor: "pointer"
};
