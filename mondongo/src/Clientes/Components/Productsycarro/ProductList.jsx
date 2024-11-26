import React, { useEffect, useState, useContext } from 'react';
import { supabase } from '../Conex/script1'; // Importamos la conexión a Supabase
import Swal from 'sweetalert2'; // Importamos SweetAlert2 para mostrar alertas
import withReactContent from 'sweetalert2-react-content'; // Extensión para usar React con SweetAlert2
import { show_alerta } from '../Animaciones/functions'; // Importamos función personalizada para alertas
import 'bootstrap/dist/css/bootstrap.min.css'; // Importamos estilos de Bootstrap
import { UserContext } from '../Conex/UserContext';

export const ProductList = ({
  allProducts, // Lista de productos en el carrito
  setAllProducts, // Función para actualizar el carrito
  countProducts, // Cantidad total de productos en el carrito
  setCountProducts, // Función para actualizar la cantidad de productos
  total, // Precio total de los productos en el carrito
  setTotal, // Función para actualizar el precio total
}) => {
  const [productos, setProductos] = useState([]); // Estado para almacenar los productos obtenidos
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos
  const [active, setActive] = useState(false); // Estado adicional para manejar la activación del carrito (opcional)
  const { user } = useContext(UserContext);

  // Hook useEffect para cargar los productos desde la base de datos al montar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase
        .from('producto') // Consulta a la tabla 'producto' en Supabase
        .select('*'); // Seleccionamos todas las columnas

      if (error) {
        console.error('Error al obtener productos:', error.message); // Manejo de errores
      } else {
        setProductos(data); // Guardamos los productos en el estado
      }
      setLoading(false); // Cambiamos el estado de carga
    };

    fetchProductos(); // Llamamos a la función para obtener los productos
  }, []); // El arreglo vacío asegura que esto solo se ejecute una vez al montar el componente

  // Función para agregar un producto al carrito
  const onAddProduct = (product) => {
    const quantity = 1; // Cada producto agregado tiene una cantidad inicial de 1
    if (!user) {
      alert('Inicia sesión para agregar productos al carrito');
      return;
    }

    // Verificamos si el producto ya existe en el carrito
    if (allProducts.find(item => item.id_producto === product.id_producto)) {
      // Si ya existe, actualizamos la cantidad del producto en el carrito
      const products = allProducts.map(item =>
        item.id_producto === product.id_producto
          ? { ...item, quantity: item.quantity + quantity } // Incrementamos la cantidad
          : item
      );
      setTotal(total + product.precio * quantity); // Actualizamos el precio total
      setCountProducts(countProducts + quantity); // Actualizamos el conteo total de productos
      return setAllProducts([...products]); // Actualizamos el carrito
    }

    // Si el producto no está en el carrito, lo añadimos como nuevo
    setTotal(total + product.precio * quantity); // Actualizamos el precio total
    setCountProducts(countProducts + quantity); // Actualizamos el conteo total de productos
    setAllProducts([...allProducts, { ...product, quantity }]); // Añadimos el producto al carrito
    show_alerta('Producto Agregado Exitosamente', 'success'); // Mostramos alerta de éxito
  };

  return (
      <div>
      <h1>Productos</h1>
      <div style={{display:'flex', flexWrap:'wrap', justifyContent: 'space-between'}}>
        {productos.map(producto => (
          <div key={producto.id_producto} style={{width:'18%', marginBottom: '20px' }}> 
          <a href={`/ElProducto/${producto.id_producto}`}>
          <div style={{position:'relative', width:'150px'}}>
             {/* Condición que verifica si las existencias del producto son menores a 5 */}
            {producto.existencias < 5 && (
                <img 
                // Ruta de la imagen que se muestra cuando las existencias son bajas
                  src='/ultimas.png' 
                  alt="Últimas unidades"
                  style={{
                     // Posiciona la imagen de forma absoluta respecto al contenedor
                    position: 'absolute',
                    top: 0, // La imagen estará alineada en la parte superior del contenedor
                    left: 0, // La imagen estará alineada a la izquierda del contenedor
                    width: '50%', // La imagen ocupará el 50% del ancho del contenedor
                    height: '50%', // La imagen ocupará el 50% de la altura del contenedor
                    objectFit: 'cover', // Asegura que la imagen se recorte correctamente para cubrir el área
                    zIndex: 1 // Asegura que la imagen esté por encima de otros elementos del contenedor
                  }}
                />
              )}
            <img
            src={producto.imagen_producto} 
            width="150"
            />
          </div>
          </a>
          <h2 className='product-name' style={{fontSize:'15px'}}>{producto.nombre_producto}</h2>
          <p className='product-price'>${producto.precio}</p>
          <button type="button" class="btn btn-warning" onClick={() => onAddProduct(producto)}>Agregar Al Carro</button>
          </div>
        ))}
      </div>

      </div>
      
  );
};

