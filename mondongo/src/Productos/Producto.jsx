import React, { useEffect, useState } from 'react';
import { supabase } from '../Components/Conex/script1';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Cargando productos...</div>;
  }
  return (
    <div>
      <h1>Productos</h1>
      <div style={{display:'flex', flexWrap:'wrap', justifyContent: 'space-between'}}>
        {productos.map(producto => (
          <div key={producto.id} style={{width:'18%'}}> 
          <img
            src={producto.imagen_producto} 
            width="150" 
          />
          <h2 className='product-name'>{producto.nombre_producto}</h2>
          <p className='product-price'>${producto.precio}</p>
          <button type="button" class="btn btn-warning">Agregar Al Carro</button>
          </div>
        ))}
      </div>
    </div>
  )};
  
export default Productos;
