import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Registro</Link>
    </nav>
  );
}

export default Header;
