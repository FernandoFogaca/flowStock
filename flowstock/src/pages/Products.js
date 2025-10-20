import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaBarcode } from "react-icons/fa";
import { Html5Qrcode } from "html5-qrcode";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanner, setScanner] = useState(null);

  // add new product
  const addProduct = (e) => {
    e.preventDefault();
    if (!name || !barcode || !quantity || !price) {
      alert("Please fill all fields");
      return;
    }
    const newProduct = {
      id: Date.now(),
      name,
      barcode,
      quantity: parseInt(quantity),
      price: parseFloat(price)
    };
    setProducts([...products, newProduct]);
    setName("");
    setBarcode("");
    setQuantity("");
    setPrice("");
  };

  // delete product
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // start scanning
  const startScanning = async () => {
    try {
      const html5QrCode = new Html5Qrcode("reader");
      setScanner(html5QrCode);
      setScanning(true);

      await html5QrCode.start(
        { facingMode: "environment" }, // back camera on phones
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          setBarcode(decodedText);
          stopScanning();
        },
        (errorMessage) => {
          // ignore decode errors
        }
      );
    } catch (err) {
      console.error("Error starting scanner:", err);
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

  // stop scanner on unmount
  useEffect(() => {
    return () => {
      if (scanner) scanner.stop().catch(() => {});
    };
  }, [scanner]);

  return (
    <div>
      <h2 style={{ color: "steelblue" }}>Products</h2>
      <p>Register and manage your products here.</p>

      {/* Scan button */}
      {!scanning ? (
        <button
          type="button"
          onClick={startScanning}
          style={btnScan}
        >
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

      {/* Camera box */}
      {scanning && (
        <div
          id="reader"
          style={{
            width: "300px",
            marginBottom: "15px",
            border: "2px solid steelblue",
            borderRadius: "8px"
          }}
        ></div>
      )}

      {/* Form section */}
      <form onSubmit={addProduct} style={formStyle}>
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />

        <input
          type="text"
          placeholder="Scan or type barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="form-control"
          autoFocus
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="form-control"
        />

        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-control"
        />

        <button type="submit" style={btnAdd}>
          <FaPlus /> Add Product
        </button>
      </form>

      {/* Product table */}
      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <table style={tableStyle}>
          <thead style={{ background: "steelblue", color: "white" }}>
            <tr>
              <th style={th}>Name</th>
              <th style={th}>Barcode</th>
              <th style={th}>Qty</th>
              <th style={th}>Price</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td style={td}>{p.name}</td>
                <td style={td}>{p.barcode}</td>
                <td style={td}>{p.quantity}</td>
                <td style={td}>${p.price.toFixed(2)}</td>
                <td style={td}>
                  <button style={btnDel} onClick={() => deleteProduct(p.id)}>
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
  marginBottom: "20px"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "white"
};

const th = {
  textAlign: "left",
  padding: "8px",
  borderBottom: "2px solid #ddd"
};

const td = {
  padding: "8px",
  borderBottom: "1px solid #ddd"
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
  justifyContent: "center"
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
  marginBottom: "10px"
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
  gap: "6px"
};
