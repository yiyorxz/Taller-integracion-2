import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer/Footer'; 
import './producto.css'; 
import { supabase } from '../Components/Conex/script1';
import { Header } from '../Components/Products1/Header';
import { useParams } from 'react-router-dom';
import Lottie from 'react-lottie';
import animacion from '../Components/Animaciones/Animation - 1730228916688.json'


function Producto(){
    const { id_producto } = useParams();
    const [allProducts, setAllProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);
    const [producto, setProducto] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(false); // Agrega esta línea para manejar el estado del carrito}
    const [showAnimation, setShowAnimation] = useState(false);
    const [descripcion, setdescripcion] = useState(false);

    useEffect(() => {
        const fetchProducto = async () => {
            console.log("ID obtenido de la URL:", id_producto);

            const { data, error } = await supabase
            .from('producto').select('*')
            .eq('id_producto', id_producto)
            .single()
            
    
          if (error) {
            console.error('Error al obtener los datos del producto:', error.message);
          } else {
            setProducto(data);
          }
          setLoading(false);
        };
    
        fetchProducto();
    }, [id_producto]);

    const onAddProduct = (product) => {
        const quantity = 1; // Inicializamos la cantidad en 1
      
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
        rendererSettings:{
          preserveAspectRatio: 'xMidYMid slice'
        }
    };
   

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
            <div className='imagen'>
                <img
                    src={producto.imagen_producto} 
                    width="550"
                />
                <div>
                    <ul class="nav nav-underline">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" onClick={() => setdescripcion(false)}>Caracteristicas</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"  onClick={() => setdescripcion(true)}>Descripcion</a>
                        </li>

                    </ul>
                    {descripcion ? (
                        <p className='descripcion'>{producto.descripcion}</p> 
                    ) : (          
                    <div className='descripcion'>  
                        <p style={{backgroundColor: 'lightgray', padding: '15px', borderRadius: '5px' }}><b>Categoria:</b> {producto.categoria}</p> 
                        <p><b>Peso:</b> {producto.peso}</p>
                        <p style={{backgroundColor: 'lightgray', padding: '15px', borderRadius: '5px' }}><b>Dimensiones:</b> {producto.dimensiones}</p>
                        <p><b>Fecha Creacion:</b> {producto.fecha_creacion}</p>
                    </div>
                    )}
    
                </div>   
            </div>
            <div className='precioynombre'>
                <h2>{producto.nombre_producto}</h2>
                <h3 style={{color:'#68F42C'}}>${producto.precio}</h3>
                <button type="button" class="btn btn-warning" onClick={() => onAddProduct(producto)}>Agregar Al Carro</button>
            </div>   
            {showAnimation && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '20px',
          borderRadius: '10px'
        }}>
          <Lottie options={defaultOptions} height={150} width={150} />
          <p style={{ color: '#fff', textAlign: 'center', marginTop: '10px' }}>Producto agregado al carrito!</p>
        </div>
      )}            
    </main>
        <Footer />
    </div>
    
    )
}

export default Producto;