import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pagos.css";

const Pago = () => {
  const [venta, setVenta] = useState(null);
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tarjeta, setTarjeta] = useState(""); // Campo editable
  const [fechaVencimiento, setFechaVencimiento] = useState(""); // Campo editable
  const [ccv, setCCV] = useState(""); // Campo editable
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar la venta actual desde localStorage
    const ventaGuardada = localStorage.getItem("ventaActual");
    if (ventaGuardada) {
      setVenta(JSON.parse(ventaGuardada));
    }
  }, []);

  const handlePago = (e) => {
    e.preventDefault();

    // Validar que se ingresen todos los datos de pago
    if (!tarjeta || !fechaVencimiento || !ccv) {
      alert("Por favor, ingrese todos los datos de la tarjeta.");
      return;
    }

    // Validar si los datos de la tarjeta son correctos
    if (
      tarjeta === "9946 6854 2114 4000" &&
      fechaVencimiento === "06/28" &&
      ccv === "986"
    ) {
      // Actualizar estado de la venta en localStorage
      const ventasGuardadas = JSON.parse(localStorage.getItem("ventas")) || [];
      const nuevasVentas = ventasGuardadas.map((v) =>
        v.producto === venta.producto && v.valor === venta.valor
          ? { ...v, estado: "pagado" }
          : v
      );
      localStorage.setItem("ventas", JSON.stringify(nuevasVentas));

      alert("Pago aceptado");
      localStorage.removeItem("ventaActual"); // Limpiar datos de la venta actual
      navigate("/ventas"); // Volver a la página de ventas
    } else {
      alert("Pago rechazado. Datos de tarjeta incorrectos.");
    }
  };

  return (
    <div className="pagar-container">
      <div className="pagar-box">
        <h2>Información de Pago</h2>
        {venta ? (
          <>
            <p><strong>Producto:</strong> {venta.producto}</p>
            <p><strong>Valor:</strong> ${venta.valor}</p>

            <form onSubmit={handlePago}>
              <input
                type="text"
                placeholder="Nombre Completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Cédula"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Número de Tarjeta"
                value={tarjeta}
                onChange={(e) => setTarjeta(e.target.value)} // Permitir ingreso de tarjeta
                required
              />
              <input
                type="text"
                placeholder="Fecha de Vencimiento (MM/AA)"
                value={fechaVencimiento}
                onChange={(e) => setFechaVencimiento(e.target.value)} // Permitir ingreso de fecha
                required
              />
              <input
                type="text"
                placeholder="CCV"
                value={ccv}
                onChange={(e) => setCCV(e.target.value)} // Permitir ingreso de CCV
                required
              />
              <button type="submit">Confirmar Pago</button>
            </form>
          </>
        ) : (
          <p>No hay venta registrada.</p>
        )}
      </div>  
    </div>
  );
};

export default Pago;
