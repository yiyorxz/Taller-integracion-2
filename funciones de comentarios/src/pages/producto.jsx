import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer/Footer'; 
import './producto.css'; 
import { supabase } from '../Components/Conex/script1';
import { Header } from '../Components/Products1/Header';
import { useParams } from 'react-router-dom';
import Lottie from 'react-lottie';
import animacion from '../Components/Animaciones/Animation - 1730228916688.json';

// Importa los nuevos componentes
import ReseñaSinUsuario from '../Components/Reseñas/ReseñaSinUsuario';
import ComentarioSinUsuario from '../Components/Reseñas/ComentarioSinUsuario';

function Producto() {
    const { id_producto } = useParams(); // Captura el ID del producto desde la URL
    const [allProducts, setAllProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [countProducts, setCountProducts] = useState(0);
    const [producto, setProducto] = useState(null); // Cambiado a null para manejar el estado de carga
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const [descripcion, setDescripcion] = useState(false);

    useEffect(() => {
        const fetchProducto = async () => {
            console.log("ID obtenido de la URL:", id_producto);

            const { data, error } = await supabase
                .from('producto')
                .select('*')
                .eq('id_producto', id_producto)
                .single();

            if (error) {
                console.error('Error al obtener los datos del producto:', error.message);
            } else {
                setProducto(data); // Establece el producto
            }
            setLoading(false); // Termina la carga
        };

        fetchProducto();
    }, [id_producto]);

    const onAddProduct = (product) => {
        const quantity = 1;

        if (allProducts.find(item => item.id_producto === product.id_producto)) {
            const products = allProducts.map(item =>
                item.id_producto === product.id_producto
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
            setTotal(total + product.precio * quantity);
            setCountProducts(countProducts + quantity);
            return setAllProducts([...products]);
        }

        setTotal(total + product.precio * quantity);
        setCountProducts(countProducts + quantity);
        setAllProducts([...allProducts, { ...product, quantity }]);
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 2000);
    };

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animacion,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    if (loading) return <div>Cargando...</div>; // Muestra mensaje de carga mientras se obtiene el producto

    return (
        <div>
            <Header
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
            />

            <main className='ola'>
                <div className='producto-y-reseña'>
                    {/* Sección de imagen, descripción y botón de añadir al carrito */}
                    <div className='imagen'>
                        <img src={producto?.imagen_producto} alt="Producto" width="550" />
                        <div>
                            <ul className="nav nav-underline">
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => setDescripcion(false)}>Características</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => setDescripcion(true)}>Descripción</a>
                                </li>
                            </ul>
                            {descripcion ? (
                                <p className='descripcion'>{producto?.descripcion}</p>
                            ) : (
                                <p className='descripcion'>Información adicional del producto</p>
                            )}
                        </div>   
                    </div>

                    {/* Precio y nombre del producto */}
                    <div className='precioynombre'>
                        <h2>{producto?.nombre_producto}</h2>
                        <h3 style={{ color: '#68F42C' }}>${producto?.precio}</h3>
                        <button type="button" className="btn btn-warning" onClick={() => onAddProduct(producto)}>Agregar Al Carro</button>
                    </div>

                    {/* Reseña debajo de la descripción */}
                    <div className="contenedor-reseña">
                        <ReseñaSinUsuario productId={id_producto} />
                    </div>
                </div>

                {/* Comentarios a la derecha */}
                <div className='contenedor-comentarios'>
                    <ComentarioSinUsuario productId={id_producto} />
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Producto;
