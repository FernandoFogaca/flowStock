import React, { useRef } from "react";
import { Bar } from "react-chartjs-2";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Reports() {
  const reportRef = useRef(); // referência pro conteúdo que será exportado

  // get products from localStorage
  const saved = localStorage.getItem("products");
  const products = saved ? JSON.parse(saved) : [];

  // basic calculations
  const lowStock = products.filter((p) => p.quantity < 10);
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  // chart setup
  const data = {
    labels: products.map((p) => p.name),
    datasets: [
      {
        label: "Stock Quantity",
        data: products.map((p) => p.quantity),
        backgroundColor: "steelblue",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Stock Overview",
        color: "steelblue",
        font: { size: 18, weight: "bold" },
      },
    },
  };

  // --- generate PDF ---
  const generatePDF = async () => {
    const element = reportRef.current; // pega o conteúdo visível
    const canvas = await html2canvas(element); // converte em imagem
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("flowstock-report.pdf");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ color: "steelblue" }}>Reports</h2>
      <p>Visual overview of your stock situation</p>

      {/* botão para gerar PDF */}
      <button onClick={generatePDF} style={btnPdf}>
        Download PDF
      </button>

      {/* conteúdo que vai pro PDF */}
      <div ref={reportRef}>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
          <div>
            <strong>Total Products:</strong> {products.length}
          </div>
          <div>
            <strong>Low Stock:</strong> {lowStock.length}
          </div>
          <div>
            <strong>Total Value:</strong> ${totalValue.toFixed(2)}
          </div>
        </div>

        <div style={{ maxWidth: "600px", margin: "30px auto" }}>
          <Bar data={data} options={options} />
        </div>

        <h3 style={{ marginTop: "40px", color: "steelblue" }}>Product Details</h3>
        <table style={tableStyle}>
          <thead style={{ background: "steelblue", color: "white" }}>
            <tr>
              <th style={th}>Product</th>
              <th style={th}>Quantity</th>
              <th style={th}>Price</th>
              <th style={th}>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i}>
                <td style={td}>{p.name}</td>
                <td style={td}>{p.quantity}</td>
                <td style={td}>${p.price}</td>
                <td style={td}>${(p.price * p.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* --- Styles --- */
const th = { padding: "8px", borderBottom: "2px solid #ddd" };
const td = { padding: "8px", borderBottom: "1px solid #eee" };

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "white",
};

const btnPdf = {
  background: "steelblue",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "6px",
  cursor: "pointer",
  marginBottom: "20px",
  fontWeight: "bold",
};
