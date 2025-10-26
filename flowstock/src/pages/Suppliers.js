import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function Suppliers({ darkMode }) {
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [productsSupplied, setProductsSupplied] = useState("");
  const [country, setCountry] = useState("br");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState(null);

  // Função para buscar endereço na API zippopotam.us
  const fetchAddress = async () => {
    if (!postalCode || !country) return;

    try {
      const res = await fetch(`https://api.zippopotam.us/${country}/${postalCode}`);
      if (!res.ok) throw new Error("ZIP/CEP not found");

      const data = await res.json();
      const place = data.places[0];

      setAddress(place["place name"] || "");
      setCity(place["state"] || "");
      setState(place["state abbreviation"] || "");
      setError(null);
    } catch (err) {
      setError("Address not found. Check ZIP/CEP and country.");
      setAddress("");
      setCity("");
      setState("");
    }
  };

  // Adicionar fornecedor
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
      country,
      address,
      city,
      state,
      postalCode,
    };

    setSuppliers([...suppliers, newSupplier]);

    // limpar campos
    setName("");
    setPhone("");
    setEmail("");
    setProductsSupplied("");
    setCountry("br");
    setAddress("");
    setCity("");
    setState("");
    setPostalCode("");
  };

  // Excluir fornecedor
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
          marginBottom: "20px",
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

        {/* Seleção de país */}
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="br">🇧🇷 Brazil</option>
          <option value="gb">🇬🇧 United Kingdom</option>
          <option value="fr">🇫🇷 France</option>
          <option value="de">🇩🇪 Germany</option>
          <option value="es">🇪🇸 Spain</option>
          <option value="nl">🇳🇱 Netherlands</option>
          <option value="be">🇧🇪 Belgium</option>
        </select>

        {/* Código postal / CEP */}
        <input
          type="text"
          placeholder="ZIP / CEP"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          onBlur={fetchAddress}
        />

        {/* Endereço automático */}
        <input
          type="text"
          placeholder="Address (auto-filled)"
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
          placeholder="State / Region"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          style={{
            background: "steelblue",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          <FaPlus /> Add Supplier
        </button>
      </form>

      {/* Tabela de fornecedores */}
      {suppliers.length === 0 ? (
        <p>No suppliers added yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: tableBg,
            color: textColor,
          }}
        >
          <thead style={{ background: "steelblue", color: "white" }}>
            <tr>
              <th style={th}>Name</th>
              <th style={th}>Phone</th>
              <th style={th}>Email</th>
              <th style={th}>Products</th>
              <th style={th}>Country</th>
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
                <td style={td}>{s.country.toUpperCase()}</td>
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

// --- estilos ---
const th = {
  textAlign: "left",
  padding: "8px",
  borderBottom: "2px solid #ddd",
};

const td = {
  padding: "8px",
  borderBottom: "1px solid #ddd",
};

const btnDel = {
  background: "white",
  color: "steelblue",
  border: "1px solid steelblue",
  padding: "4px 8px",
  borderRadius: "4px",
  cursor: "pointer",
};
