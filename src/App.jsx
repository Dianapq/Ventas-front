import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./componentes/Login";
import RegisterAdmin from "./componentes/RegisterAdmin";
import RegisterUser from "./componentes/RegisterUser";
import Dashboard from "./componentes/Dashboard";
import Ventas from "./componentes/Ventas";
import Pago from "./componentes/Pago";

const App = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [role, setRole] = useState("");

  return (
    <>
      {showRegister ? (
        role === "admin" ? (
          <RegisterAdmin setShowRegister={setShowRegister} />
        ) : (
          <RegisterUser setShowRegister={setShowRegister} />
        )
      ) : (
        <Routes>
          <Route path="/" element={<Login setShowRegister={setShowRegister} setRole={setRole} />} />
          <Route path="/login" element={<Login setShowRegister={setShowRegister} setRole={setRole} />} />
          <Route path="/register-admin" element={<RegisterAdmin />} />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/pago" element={<Pago />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      )}
    </>
  );
};

export default App;
