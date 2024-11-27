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
  const [usuarios, setUsuarios] = useState([]);
  const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorías únicas
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(''); // Estado para la categoría activa
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos
  const { user } = useContext(UserContext); // Obtener usuario desde el contexto

  // Hook useEffect para cargar los productos desde la base de datos al montar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      // Consultamos todos los productos desde la tabla "producto" en Supabase
      const { data, error } = await supabase
        .from('producto') // Tabla en la base de datos
        .select('*'); // Seleccionamos todas las columnas

      if (error) {
        console.error('Error al obtener productos:', error.message); // Manejo de errores
      } else {
        setProductos(data); // Guardamos los productos en el estado

        // Extraer categorías únicas de los productos
        const categoriasUnicas = [...new Set(data.map((producto) => producto.categoria))];
        setCategorias(categoriasUnicas); // Guardamos las categorías en el estado
      }
      setLoading(false); // Cambiamos el estado de carga

      const { data: usuariosData, error: usuariosError } = await supabase
      .from('usuario') // Asegúrate de que la tabla de usuarios se llame "usuario"
      .select('id_usuario, nombre'); // Selecciona solo las columnas necesarias
      if (usuariosError) throw usuariosError;

    // Crear un diccionario para mapear id_usuario a nombre
      const usuariosMap = {};
      usuariosData.forEach((usuario) => {
        usuariosMap[usuario.id_usuario] = usuario.nombre;
      });
      setProductos(data);
      setUsuarios(usuariosMap);
    };

    fetchProductos(); // Llamamos a la función para obtener los productos
  }, []); // El arreglo vacío asegura que esto solo se ejecute una vez al montar el componente

  // Función para agregar un producto al carrito
  const onAddProduct = (product) => {
    const quantity = 1; // Cada producto agregado tiene una cantidad inicial de 1
    if (!user) {
      alert('Inicia sesión para agregar productos al carrito'); // Si no hay usuario, mostramos una alerta
      return;
    }

    // Verificamos si el producto ya existe en el carrito
    if (allProducts.find((item) => item.id_producto === product.id_producto)) {
      // Si ya existe, actualizamos la cantidad del producto en el carrito
      const products = allProducts.map((item) =>
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

  // Filtrar productos por categoría seleccionada
  const productosFiltrados = categoriaSeleccionada
    ? productos.filter((producto) => producto.categoria === categoriaSeleccionada) // Si hay una categoría seleccionada, mostramos solo los productos de esa categoría
    : productos; // Si no hay categoría seleccionada, mostramos todos los productos

  return (
    <div>
      <h1>Productos</h1>

      {/* Filtro de Categorías */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="categorias" style={{ marginRight: '10px' }}>Filtrar por Categoría:</label>
        <select
          id="categorias"
          className="form-select"
          value={categoriaSeleccionada} // Categoría actualmente seleccionada
          onChange={(e) => setCategoriaSeleccionada(e.target.value)} // Cambiar categoría activa
        >
          <option value="">Todas las Categorías</option>
          {categorias.map((categoria, index) => (
            <option key={index} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de Productos */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {productosFiltrados.map((producto) => (
          <div key={producto.id_producto} style={{ width: '18%', marginBottom: '20px' }}>
            <a href={`/ElProducto/${producto.id_producto}`}>
              <div style={{ position: 'relative', width: '150px' }}>
                {/* Condición que verifica si las existencias del producto son menores a 5 */}
                {producto.existencias < 5 && (
                  <img
                    src="/ultimas.png" // Ruta de la imagen para indicar "últimas unidades"
                    alt="Últimas unidades"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '50%',
                      height: '50%',
                      objectFit: 'cover',
                      zIndex: 1,
                    }}
                  />
                )}
                <p>{usuarios[producto.id_usuario]}</p>
                <img src={producto.imagen_producto} width="150" alt={producto.nombre_producto} />
              </div>
            </a>
            <h2 className="product-name" style={{ fontSize: '15px' }}>
              {producto.nombre_producto}
            </h2>
            <p className="product-price">${producto.precio}</p>
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => onAddProduct(producto)}
            >
              Agregar Al Carro
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
