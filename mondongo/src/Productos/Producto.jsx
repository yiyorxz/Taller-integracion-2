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
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {productos.map(producto => (
          <li
            key={producto.id_producto} // Asegúrate de que este ID sea único
            style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}
          >
            <h3>{producto.nombre_producto}</h3>
            <p><strong>Descripción:</strong> {producto.descripcion}</p>
            <p><strong>Precio:</strong> ${producto.precio}</p>
            <p><strong>Existencias:</strong> {producto.existencias}</p>
            <p><strong>Categoría:</strong> {producto.categoria}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Productos;
