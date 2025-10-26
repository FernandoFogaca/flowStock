import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaBarcode, FaExclamationTriangle, FaImage } from "react-icons/fa";
import { Html5Qrcode } from "html5-qrcode";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); // 🖼️ nova variável
  const [scanning, setScanning] = useState(false);
  const [scanner, setScanner] = useState(null);

  const LOW_STOCK_LIMIT = 5;

  // ✅ adiciona novo produto
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
      price: parseFloat(price),
      image: image || null, // 🖼️ guarda a imagem
    };

    setProducts([...products, newProduct]);
    // limpa os campos
    setName("");
    setBarcode("");
    setQuantity("");
    setPrice("");
    setImage(null);
  };

  // ✅ apaga produto
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // ✅ leitura do arquivo de imagem
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // gera link temporário pra mostrar
    }
  };

  // ✅ scanner de código de barras
  const startScanning = async () => {
    try {
      const html5QrCode = new Html5Qrcode("reader");
      setScanner(html5QrCode);
      setScanning(true);
      await html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          setBarcode(decodedText);
          stopScanning();
        }
      );
    } catch {
      alert("Camera access error");
    }
  };

  const stopScanning = async () => {
    if (scanner) {
      await scanner.stop().catch(() => {});
      await scanner.clear();
    }
    setScanning(false);
  };

  useEffect(() => {
    return () => {
      if (scanner) scanner.stop().catch(() => {});
    };
  }, [scanner]);

  // produtos com baixo estoque
  const lowStockProducts = products.filter((p) => p.quantity <= LOW_STOCK_LIMIT);

  return (
    <div>
      <h2 style={{ color: "steelblue" }}>Products</h2>
      <p>Register and manage your products here.</p>

      {/* 🔔 alerta de estoque baixo */}
      {lowStockProducts.length > 0 && (
        <div
          style={{
            background: "#fff3cd",
            border: "1px solid #ffeeba",
            color: "#856404",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FaExclamationTriangle />
          <div>
            <strong>Low stock alert!</strong>
            <ul style={{ margin: 0, paddingLeft: "20px" }}>
              {lowStockProducts.map((p) => (
                <li key={p.id}>
                  {p.name} ({p.quantity} units left)
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* botão de escanear */}
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

      {/* formulário */}
      <form onSubmit={addProduct} style={formStyle}>
        <input type="text" placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Scan or type barcode" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
        <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <input type="number" step="0.01" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />

        {/* 🖼️ campo novo de imagem */}
        <label style={{ fontWeight: "bold", color: "steelblue" }}>
          <FaImage /> Product image:
        </label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {/* pré-visualização */}
        {image && (
          <img
            src={image}
            alt="Preview"
            style={{ width: "120px", marginTop: "10px", borderRadius: "8px" }}
          />
        )}

        <button type="submit" style={btnAdd}>
          <FaPlus /> Add Product
        </button>
      </form>

      {/* tabela */}
      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <table style={tableStyle}>
          <thead style={{ background: "steelblue", color: "white" }}>
            <tr>
              <th style={th}>Image</th>
              <th style={th}>Name</th>
              <th style={th}>Barcode</th>
              <th style={th}>Qty</th>
              <th style={th}>Price</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                style={{
                  backgroundColor: p.quantity <= LOW_STOCK_LIMIT ? "#fdecea" : "white",
                }}
              >
                <td style={td}>
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ width: "50px", borderRadius: "6px" }}
                    />
                  ) : (
                    "—"
                  )}
                </td>
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

/* --- estilos --- */
const formStyle = { display: "grid", gap: "10px", maxWidth: "400px", marginBottom: "20px" };
const tableStyle = { width: "100%", borderCollapse: "collapse", background: "white" };
const th = { textAlign: "left", padding: "8px", borderBottom: "2px solid #ddd" };
const td = { padding: "8px", borderBottom: "1px solid #ddd" };
const btnAdd = {
  background: "steelblue",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
};
const btnScan = {
  background: "white",
  color: "steelblue",
  border: "1px solid steelblue",
  padding: "8px",
  borderRadius: "4px",
  cursor: "pointer",
  marginBottom: "10px",
};
const btnDel = {
  background: "white",
  color: "steelblue",
  border: "1px solid steelblue",
  padding: "4px 8px",
  borderRadius: "4px",
  cursor: "pointer",
};
