import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo de Mercado Libre */}
      <div className="navbar-brand">
        <Link to="/">
          <img src="" alt="Logo" className="navbar-logo" />
        </Link>
      </div>

      {/* Barra de búsqueda */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Buscar productos, marcas y más..."
          className="navbar-search-input"
        />
        <button className="navbar-search-btn">Buscar</button>
      </div>

      {/* Enlaces de cuenta y categorías */}
      <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
        <ul className="navbar-links">
          <li><Link to="/deals">Ofertas</Link></li>
          <li><Link to="/products">Categorías</Link></li>
          <li><Link to="/account">Mi cuenta</Link></li>
          <li><Link to="/Productos">Carrito</Link></li>
        </ul>
      </div>

      {/* Menú de hamburguesa para móviles */}
      <button className="navbar-toggle" onClick={toggleMenu}>
        &#9776;
      </button>
    </nav>
  );
}

export default Navbar;
