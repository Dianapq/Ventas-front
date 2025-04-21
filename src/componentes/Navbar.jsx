import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/dashboard">Admin</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Registro</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/ventas">Ventas</Link></li>
        <li><Link to="/pago">Pago</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
