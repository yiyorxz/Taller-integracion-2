import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Products/products.css';


const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
  const fetchProducts = async() => {
    try {
      const response = await axios.get("http://localhost:9000/api/products")
      console.log(response.data)
      setProducts(response.data);
      setLoading(false); 
    } catch(error){
      console.error('no se pudieron obtener los productos');
      setLoading(false);
    }
  };
  useEffect(() =>{
    fetchProducts();
  }, [])
  
  return (
  <div>
    {loading ? (
      <div className="loading">Cargando productos...Por Favor espere</div>
    ) : (
    <div className='product-list'>
      {products?.map((product) => (
        <div key={product.id_producto} className='product-item'>
          <h2 className='product-name'>{product.nombre_producto}</h2>
          <p className='product-price'>${product.precio}</p>
          <button type="button" class="btn btn-warning">Agregar Al Carro</button>
          </div>
        ))}
    </div>
  )}
  </div>
);
}


export default Products;