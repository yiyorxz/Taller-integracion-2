import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Logo/1.png';
import { Header } from '../Products1/Header';
import { ProductList } from '../Products1/ProductList';
import { supabase } from '../Conex/script1';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} style={{width:'150px'}}/>
      </div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Buscar productos, marcas y más..."
          className="navbar-search-input"
        />
        <button className="navbar-search-btn">Buscar</button>
      </div>

      <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
        <ul className="navbar-links">
          <li><Link to="/deals">Ofertas</Link></li>
          <li><Link to="/products">Categorías</Link></li>
          <li><Link to="/account">Mi cuenta</Link></li>
          <li>
            <Header
            allProducts={allProducts}
			      setAllProducts={setAllProducts}
			      total={total}
			      setTotal={setTotal}
			      countProducts={countProducts}
			      setCountProducts={setCountProducts}
            />
          </li>
        </ul>
      </div>
      <button className="navbar-toggle" onClick={toggleMenu}>
        &#9776;
      </button>
    </nav>
  );
}

export default Navbar;
