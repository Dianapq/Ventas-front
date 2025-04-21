import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Ventas.css"; // ✅ Importar estilos

const Ventas = () => {
  const [producto, setProducto] = useState("");
  const [valor, setValor] = useState("");
  const [ventas, setVentas] = useState([]);
  const navigate = useNavigate();

  // ✅ Obtener usuario del localStorage
  const email = localStorage.getItem("usuario") || "invitado";
  const usuario = email.split("@")[0];

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "user") {
      alert("Acceso denegado. Solo los usuarios pueden ingresar.");
      navigate("/dashboard");
    }
    cargarVentas();
  }, [navigate]);

  const handleVenta = (e) => {
    e.preventDefault();
    const nuevaVenta = {
      fecha: new Date().toLocaleDateString(),
      usuario,
      producto,
      valor,
      estado: "pendiente",
    };

    localStorage.setItem("ventaActual", JSON.stringify(nuevaVenta));

    const ventasGuardadas = JSON.parse(localStorage.getItem("ventas")) || [];
    ventasGuardadas.push(nuevaVenta);
    localStorage.setItem("ventas", JSON.stringify(ventasGuardadas));

    alert("Venta registrada. Procede al pago.");
    navigate("/pago");
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
    <div className="ventas-container">
      {/* ✅ Botón de salir bien posicionado */}
      <button className="logout-button" onClick={handleLogout}>
        Salir
      </button>

      <div className="ventas-box">
        <h2>Bienvenido, {usuario}</h2>

        <h3>Registrar Venta</h3>
        <form onSubmit={handleVenta}>
          <input
            type="text"
            placeholder="Nombre del Producto"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Valor del Artículo"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
          <button type="submit">Pagar</button>
        </form>
      </div>

      <h3>Listado de Ventas</h3>
      <button onClick={cargarVentas}>Actualizar Página</button>
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
  );
};

export default Ventas;
