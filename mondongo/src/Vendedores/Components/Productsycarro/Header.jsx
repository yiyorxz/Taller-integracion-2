import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../Logo/1.png';
import Crud from '../Crud/crud';

export const Header = ({
	allProducts,
	setAllProducts,
	total,
	countProducts,
	setCountProducts,
	setTotal,
}) => {
	const [active, setActive] = useState(false);
	const onDeleteProduct = product => {
		const results = allProducts.filter(
			item => item.id_producto !== product.id_producto
		);
		setTotal(total - product.precio * product.quantity);
		setCountProducts(countProducts - product.quantity);
		setAllProducts(results);
	};
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	const [isOpen, setIsOpen] = useState(false);
	const [crud, setcrud] = useState(false);
	


	const mostrarcrud = () =>{
		setcrud(true);
	}
	const ocultar = () =>{
		setcrud(false);
	}


	return (
		<>
			<nav className="navbar">
				<div className="navbar-brand">
					<img src={logo} style={{ width: '150px' }} />
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
						<li><Link to="/products">Productos</Link></li>
						<li><Link to="/deals">Ofertas</Link></li>
						<li><Link to="/categories">Categorías</Link></li>
						<li><Link to="/account">Mi cuenta</Link></li>
						<li><Link to="/login">Login</Link></li>
      					<li><Link to="/register">Registro</Link></li>
						<li onClick={mostrarcrud} style={{ cursor: 'pointer' }}>Agregar Producto</li>
					</ul>
				</div>
				<button className="navbar-toggle" onClick={toggleMenu}>
					&#9776;
				</button>
			</nav>

			{crud && <Crud isOpen={crud} onClose={ocultar} />}
		</>
	);
};
