import React, { useState, useEffect } from "react";
import { FaPlus, FaExchangeAlt, FaTrash, FaBarcode } from "react-icons/fa";
import { Html5Qrcode } from "html5-qrcode";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("in"); // in = entry, out = exit
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanner, setScanner] = useState(null);

  // add transaction
  const addTransaction = (e) => {
    e.preventDefault();

    if (!product || !quantity) {
      alert("Please fill in all fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      product,
      quantity: parseInt(quantity),
      type,
      date: new Date().toLocaleString(),
    };

    setTransactions([...transactions, newTransaction]);
    setProduct("");
    setQuantity("");
  };

  // delete transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // start scanning
  const startScanning = async () => {
    try {
      const html5QrCode = new Html5Qrcode("reader");
      setScanner(html5QrCode);
      setScanning(true);

      await html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          setProduct(decodedText);
          stopScanning();
        }
      );
    } catch (err) {
      console.error("Scanner error:", err);
      alert("Camera access error. Check permissions.");
    }
  };

  // stop scanning
  const stopScanning = async () => {
    if (scanner) {
      await scanner.stop().catch(() => {});
      await scanner.clear();
    }
    setScanning(false);
  };

  // stop scanner when leaving page
  useEffect(() => {
    return () => {
      if (scanner) scanner.stop().catch(() => {});
    };
  }, [scanner]);

  return (
    <div>
      <h2 style={{ color: "steelblue" }}>Transactions</h2>
      <p>Record all product entries and exits here.</p>

      {/* Scan button */}
      {!scanning ? (
        <button type="button" onClick={startScanning} style={btnScan}>
          <FaBarcode /> Scan Barcode
        </button>
      ) : (
        <button
          type="button"
          onClick={stopScanning}
          style={{ ...btnScan, background: "steelblue", color: "white" }}
        >
          Stop Scanning
        </button>
      )}

      {/* Scanner box */}
      {scanning && (
        <div
          id="reader"
          style={{
            width: "300px",
            marginBottom: "15px",
            border: "2px solid steelblue",
            borderRadius: "8px",
          }}
        ></div>
      )}

      {/* Form */}
      <form onSubmit={addTransaction} style={formStyle}>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={selectStyle}
        >
          <option value="in">Entry (In)</option>
          <option value="out">Exit (Out)</option>
        </select>

        <input
          type="text"
          placeholder="Product name or barcode"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button type="submit" style={btnAdd}>
          <FaPlus /> Add Transaction
        </button>
      </form>

      {/* Table */}
      {transactions.length === 0 ? (
        <p>No transactions recorded yet.</p>
      ) : (
        <table style={tableStyle}>
          <thead style={{ background: "steelblue", color: "white" }}>
            <tr>
              <th style={th}>Date</th>
              <th style={th}>Type</th>
              <th style={th}>Product</th>
              <th style={th}>Qty</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td style={td}>{t.date}</td>
                <td style={{ ...td, color: t.type === "in" ? "green" : "red" }}>
                  {t.type === "in" ? "Entry" : "Exit"}
                </td>
                <td style={td}>{t.product}</td>
                <td style={td}>{t.quantity}</td>
                <td style={td}>
                  <button style={btnDel} onClick={() => deleteTransaction(t.id)}>
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

/* --- styles --- */
const formStyle = {
  display: "grid",
  gap: "10px",
  maxWidth: "400px",
  marginBottom: "20px",
};

const selectStyle = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "white",
};

const th = {
  textAlign: "left",
  padding: "8px",
  borderBottom: "2px solid #ddd",
};

const td = {
  padding: "8px",
  borderBottom: "1px solid #ddd",
};

const btnAdd = {
  background: "steelblue",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  justifyContent: "center",
};

const btnDel = {
  background: "white",
  color: "steelblue",
  border: "1px solid steelblue",
  padding: "4px 8px",
  borderRadius: "4px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const btnScan = {
  background: "white",
  color: "steelblue",
  border: "1px solid steelblue",
  padding: "8px",
  borderRadius: "4px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontWeight: "bold",
  marginBottom: "10px",
};
