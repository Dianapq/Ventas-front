import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [ventas, setVentas] = useState([]); // Lista de ventas
  const admin = localStorage.getItem("usuario") || "Admin"; // Nombre del administrador
  const navigate = useNavigate();

  useEffect(() => {
    verificarAcceso();
    cargarVentas();
  }, []);

  const verificarAcceso = () => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
    }
  };

  const cargarVentas = () => {
    const ventasGuardadas = JSON.parse(localStorage.getItem("ventas")) || [];
    setVentas(ventasGuardadas);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* ✅ Encabezado */}
      <div className="dashboard-header">
        <h2>Bienvenido, {admin}</h2>
        <button onClick={handleLogout} className="dashboard-button">
          Salir
        </button>
      </div>

      {/* ✅ Lista de Ventas */}
      <h3>Lista de Ventas</h3>
      <button onClick={cargarVentas} className="dashboard-button">
        Actualizar Página
      </button>

      {ventas.length > 0 ? (
        <div className="dashboard-table">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Usuario</th>
                <th>Producto</th>
                <th>Valor</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta, index) => (
                <tr key={index}>
                  <td>{venta.fecha}</td>
                  <td>{venta.usuario || "Desconocido"}</td>
                  <td>{venta.producto}</td>
                  <td>${venta.valor}</td>
                  <td>{venta.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-sales">No hay ventas registradas.</p>
      )}
    </div>
  );
};

export default Dashboard;
