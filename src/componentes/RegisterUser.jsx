import React, { useState } from "react";
import axios from "axios";
import "../styles/Register.css"; 

const RegisterUser = ({ setShowRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
        role: "user", // Usuario normal
      });
      alert("¡Usuario registrado con éxito!");
      setShowRegister(false);
    } catch (error) {
      alert("Error en el registro");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Registrar Usuario</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Registrar</button>
        </form>
        <button onClick={() => setShowRegister(false)}>Volver al Login</button>
      </div>
    </div>
  );
};

export default RegisterUser;
