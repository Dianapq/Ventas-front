import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";// ✅ Usa ../ para salir de 'componentes' y entrar en 'styles'

const Login = ({ setShowRegister, setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      //const response = await fetch("http://localhost:5000/api/auth/login", {
      const response = await fetch("https://ventas-backend-one.vercel.app//api/auth/login", {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Error en el login");
      }

      const data = await response.json();

      if (!data.user) {
        throw new Error("Usuario no encontrado");
      }

      // ✅ Guardar ID del usuario, token y rol en localStorage
      localStorage.setItem("token", data.token || "");
      localStorage.setItem("usuarioId", data.user._id || "");
      const emailUsuario = data.user.email.split("@")[0]; // Extrae lo antes del "@"
      localStorage.setItem("usuario", emailUsuario);

      localStorage.setItem("role", data.user.role || "");

      // ✅ Redirigir según el rol
      if (data.user.role === "admin") {
        navigate("/dashboard"); // Admin → Dashboard
      } else {
        navigate("/ventas"); // Usuario → Ventas
      }
    } catch (error) {
      console.error("❌ Error en el login:", error.message);
      alert("❌ Error en el servidor o credenciales incorrectas");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Bienvenidos a Only Stock</h2>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Ingresar</button>
        </form>

        <button onClick={() => { setRole("user"); setShowRegister(true); }}>
          Registrar Usuario
        </button>
        <button onClick={() => { setRole("admin"); setShowRegister(true); }}>
          Registrar Admin
        </button>
      </div>
    </div>
  );
};

export default Login;
