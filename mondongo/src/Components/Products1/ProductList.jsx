import React, { useEffect, useState } from 'react';
import { supabase } from '../Conex/script1';

export const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false); // Agrega esta línea para manejar el estado del carrito

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase
        .from('producto')
        .select('*');

      if (error) {
        console.error('Error al obtener productos:', error.message);
      } else {
        setProductos(data);
      }
      setLoading(false);
    };

    fetchProductos();
  }, []);

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
  };

  return (
      <div>
      <h1>Productos</h1>
      <div style={{display:'flex', flexWrap:'wrap', justifyContent: 'space-between'}}>
        {productos.map(producto => (
          <div key={producto.id_producto} style={{width:'18%', marginBottom: '20px' }}> 
          <img
            src={producto.imagen_producto} 
            width="150"
          />
          <h2 className='product-name' style={{fontSize:'15px'}}>{producto.nombre_producto}</h2>
          <p className='product-price'>${producto.precio}</p>
          <button type="button" class="btn btn-warning" onClick={() => onAddProduct(producto)}>Agregar Al Carro</button>
          </div>
        ))}
      </div>
    </div>
  );
};
