import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para la navegación entre rutas
import './Header.css'; // Estilos personalizados para el encabezado
import logo from '../Logo/1.png'; // Importamos el logo de la aplicación

export const Header = ({
	allProducts, // Lista de productos en el carrito
	setAllProducts, // Función para actualizar los productos en el carrito
	total, // Total acumulado del carrito
	countProducts, // Cantidad de productos en el carrito
	setCountProducts, // Función para actualizar la cantidad de productos
	setTotal, // Función para actualizar el total
}) => {
	// Estados locales para manejar el menú y el carrito
	const [active, setActive] = useState(false); // Controla si el carrito está visible
	const [isOpen, setIsOpen] = useState(false); // Controla si el menú está abierto
	const [crud, setcrud] = useState(false); // Estado adicional para gestionar otros cambios

	// Función para eliminar un producto del carrito
	const onDeleteProduct = product => {
		const results = allProducts.filter(
			item => item.id_producto !== product.id_producto // Filtra productos que no sean el eliminado
		);
		setTotal(total - product.precio * product.quantity); // Actualiza el total restando el precio del producto eliminado
		setCountProducts(countProducts - product.quantity); // Resta la cantidad del producto eliminado
		setAllProducts(results); // Actualiza el carrito con los productos restantes
	};

	// Función para alternar la visibilidad del menú
	const toggleMenu = () => {
		setIsOpen(!isOpen); // Cambia el estado entre abierto y cerrado
	};

	// Función para vaciar todo el carrito
	const onCleanCart = () => {
		setAllProducts([]); // Limpia la lista de productos
		setTotal(0); // Resetea el total a 0
		setCountProducts(0); // Resetea la cantidad de productos a 0
	};

	return (
		<>
			{/* Barra de navegación */}
			<nav className="navbar">
				{/* Sección del logo */}
				<div className="navbar-brand">
					<img src={logo} style={{ width: '150px' }} alt="Logo" />
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

				{/* Menú de navegación */}
				<div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
					<ul className="navbar-links">
						{/* Enlaces a otras páginas */}
						<li><Link to="/products">Productos</Link></li>
						<li><Link to="/deals">Ofertas</Link></li>
						<li><Link to="/categories">Categorías</Link></li>
						<li><Link to="/account">Mi cuenta</Link></li>
						<li><Link to="/login">Login</Link></li>
      					<li><Link to="/register">Registro</Link></li>
						<li>
							{/* Icono del carrito */}
							<div className='container-icon'>
								<div
									className='container-cart-icon'
									onClick={() => setActive(!active)} // Alterna la visibilidad del carrito
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
									{/* Contador de productos en el carrito */}
									<div className='count-products'>
										<span id='contador-productos'>{countProducts}</span>
									</div>
								</div>

								{/* Contenido del carrito */}
								<div
									className={`container-cart-products ${
										active ? '' : 'hidden-cart'
									}`}
								>
									{/* Si hay productos en el carrito */}
									{allProducts.length ? (
										<>
											<div className='row-product'>
												{/* Mostrar cada producto en el carrito */}
												{allProducts.map((product) => (
													<div className='cart-product' key={product.id_producto}>
														<div className='info-cart-product'>
															<span className='cantidad-producto-carrito'>
																{product.quantity} {/* Cantidad del producto */}
															</span>
															<p className='titulo-producto-carrito'>
																{product.nombre_producto} {/* Nombre del producto */}
															</p>
															<span className='precio-producto-carrito'>
																${product.precio} {/* Precio del producto */}
															</span>
														</div>
														{/* Icono para eliminar un producto del carrito */}
														<svg
															xmlns='http://www.w3.org/2000/svg'
															fill='none'
															viewBox='0 0 24 24'
															strokeWidth='1.5'
															stroke='currentColor'
															className='icon-close'
															width={"28"}
															height={"28"}
															onClick={() => onDeleteProduct(product)} // Eliminar producto
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

											{/* Total del carrito */}
											<div className='cart-total'>
												<h3>Total:</h3>
												<span className='total-pagar'>${total}</span>
											</div>

											{/* Botón para vaciar el carrito */}
											<button className='btn-clear-all' onClick={onCleanCart}>
												Vaciar Carrito
											</button>
										</>
									) : (
										// Si no hay productos en el carrito
										<p className='cart-empty'>El carrito está vacío</p>
									)}
								</div>
							</div>
						</li>
					</ul>
				</div>

				{/* Botón para alternar la visibilidad del menú en pantallas pequeñas */}
				<button className="navbar-toggle" onClick={toggleMenu}>
					&#9776; {/* Ícono de hamburguesa */}
				</button>
			</nav>
		</>
	);
};
