import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../Navbar/Navbar.css';
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
	

	const onCleanCart = () => {
		setAllProducts([]);
		setTotal(0);
		setCountProducts(0);
	};

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
						<li><Link to="/deals">Ofertas</Link></li>
						<li><Link to="/products">Categorías</Link></li>
						<li><Link to="/account">Mi cuenta</Link></li>
						<li onClick={mostrarcrud} style={{ cursor: 'pointer' }}>Agregar Producto</li>
						<li>
							<div className='container-icon'>
								<div
									className='container-cart-icon'
									onClick={() => setActive(!active)}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth='1.5'
										stroke='currentColor'
										className='icon-cart'
										width={"38"}
										height={"38"}
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
										/>
									</svg>
									<div className='count-products'>
										<span id='contador-productos'>{countProducts}</span>
									</div>
								</div>

								<div
									className={`container-cart-products ${
										active ? '' : 'hidden-cart'
									}`}
								>
									{allProducts.length ? (
										<>
											<div className='row-product'>
												{allProducts.map((product) => (
													<div className='cart-product' key={product.id_producto}>
														<div className='info-cart-product'>
															<span className='cantidad-producto-carrito'>
																{product.quantity}
															</span>
															<p className='titulo-producto-carrito'>
																{product.nombre_producto}
															</p>
															<span className='precio-producto-carrito'>
																${product.precio}
															</span>
														</div>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															fill='none'
															viewBox='0 0 24 24'
															strokeWidth='1.5'
															stroke='currentColor'
															className='icon-close'
															width={"28"}
															height={"28"}
															onClick={() => onDeleteProduct(product)}
														>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																d='M6 18L18 6M6 6l12 12'
															/>
														</svg>
													</div>
												))}
											</div>

											<div className='cart-total'>
												<h3>Total:</h3>
												<span className='total-pagar'>${total}</span>
											</div>

											<button className='btn-clear-all' onClick={onCleanCart}>
												Vaciar Carrito
											</button>
										</>
									) : (
										<p className='cart-empty'>El carrito está vacío</p>
									)}
								</div>
							</div>
						</li>
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
