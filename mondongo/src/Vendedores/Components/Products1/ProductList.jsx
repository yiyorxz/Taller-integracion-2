import React, { useEffect, useState } from 'react';
import { supabase } from '../Conex/script1';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../Animaciones/functions';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  const [active, setActive] = useState(false); // Agrega esta línea para manejar el estado del carrito}

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
    show_alerta('Producto Agregado Exitosamente','success')
  };


  const deleteProduct = async (id, nombre) => {
    const MySawl = withReactContent(Swal);
    const result = await MySawl.fire({
      title:'¿Esta Seguro/a Que quiere eliminar el producto'+ nombre+' ?',
      icon: 'question', text:'No se podra dar marcha atras',
      showCancelButton:true,confirmButtonText:'Si, Eliminar',cancelButtonText:'Cancelar',
      
    })
    if(result.isConfirmed){
      const { error } = await supabase
      .from('producto')
      .delete()
      .eq('id_producto', id);
      if(error){
          console.error("error", console.error);
          show_alerta('No se pudo eliminar el producto','info')
          console.log(id)
        }
        else{
          console.log("producto Eliminado");
          show_alerta('Producto Eliminado Exitosamente','success')
        }
    }    
  }




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
          <button onClick={() => deleteProduct(producto.id_producto, producto.nombre_producto)} className='btn btn-danger'>
            <i class="bi bi-trash-fill"></i>
          </button>
          </div>
        ))}
      </div>

      </div>
      
  );
};

