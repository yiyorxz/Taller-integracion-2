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

  //Para editar Productos esto ..
  const [editar, seteditar] = useState(false);
  const [prod_ac, setprodac] = useState(null);
  
  const [nombre_producto, setnombre] = useState('');
  const [descripcion, setdescripcion] = useState('')
  const [precio, setprecio] = useState('')
  const [categoria, setcategoria] = useState('')
  const [dimensiones, setdimensiones] = useState('')
  const [existencias, setexistencias] = useState('')
  const [iva, setiva] = useState('')
  const [peso, setpeso] = useState('')
  const [imagen_producto, setimagen] = useState(null)
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  //..


  const _handleImageChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
        setFile(file);
        setImagePreviewUrl(reader.result);
        setimagen(reader.result);
    };

    if (file) {
        reader.readAsDataURL(file);
    }
  };

  

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



  //Funcion para obtener los datos del producto seleccionado y esos datos, ponerlos en el formulario de edicion
  const obtener = (producto) =>{
    setprodac(producto);
    seteditar(true);
    setnombre(producto.nombre_producto);
    setdescripcion(producto.descripcion);
    setprecio(producto.precio);
    setcategoria(producto.categoria);
    setdimensiones(producto.dimensiones);
    setexistencias(producto.existencias);
    setpeso(producto.peso);
  } 

  const editProduct = async (producto) => {
    const { error } = await supabase
    .from('producto')
    .update({
        nombre_producto: nombre_producto || producto.nombre_producto, //Nombre producto sera o el nombre que tenia antes, o el q sera editado, y asi con los demas.
        descripcion: descripcion || producto.descripcion,
        precio: precio || producto.precio,
        categoria: categoria || producto.categoria,
        dimensiones: dimensiones || producto.dimensiones,
        existencias: existencias || producto.existencias,
        iva: iva || producto.iva,
        peso: peso || producto.peso,
        imagen_producto: imagen_producto || producto.imagen_producto,
    })
    .eq('id_producto', producto.id_producto);
    if(error){
        console.error("error", console.error);
        show_alerta('No se pudo editar el producto','error')
    }
    else{
        console.log("producto editado");
        show_alerta('Producto Editado Exitosamente','success');
        seteditar(false);
    }
  } 


  //Funcion para eliminar productos
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
      .eq('id_producto', id)
      if(error){
          console.error("error", console.error);
          show_alerta('No se pudo eliminar el producto','info')
          console.log(id)
          return;
        }
        
      const { error: Errorhistorial } = await supabase 
        .from('historial_creacion_productos')
        .delete()
        .eq('id_producto', id);
        if(Errorhistorial){
            console.error("error", console.error);
            show_alerta('No se pudo eliminar el producto','info')
            console.log(id)
            return;
          }
      const { error: Errorpuntua } = await supabase
        .from('puntuaciones')
        .delete()
        .eq('id_producto', id);
        if(Errorpuntua){
            console.error("error", console.error);
            show_alerta('No se pudo eliminar el producto','info')
            console.log(id)
            return;
          }
      const { error: Errorcome} = await supabase
        .from('comentarios')
        .delete()
        .eq('id_producto', id);
        if(Errorcome){
            console.error("error", console.error);
            show_alerta('No se pudo eliminar el producto','info')
            console.log(id)
            return;
          }    

    console.log("producto Eliminado");
    show_alerta('Producto Eliminado Exitosamente','success')
        }   
  }
//..



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
          <button onClick={() => deleteProduct(producto.id_producto, producto.nombre_producto)} className='btn btn-danger'>         
            <i class="bi bi-trash-fill"></i> 
          </button> 
          <button onClick={() => obtener(producto)}className='btn btn-warning'>
              <i class="bi bi-pencil"></i>
          </button>
          </div>
        ))}
      </div>
      {editar && (
        <div className='modal fade show' style={{ display: 'block' }}>
        <div className='modal-dialog'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <label className='h5'></label>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={() => seteditar(false)}></button>    
                </div>
                <div className='modal-body'>
                    <h3>Edita tu producto</h3>
                    <input type='hidden' id='id'></input>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                        <input type='text' className='form-control' placeholder='Nombre' value={nombre_producto} onChange={(e) => setnombre(e.target.value)}/>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                        <input type='text' id='descripcion' className='form-control' placeholder='Descripcion' value={descripcion} onChange={(e) => setdescripcion(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                        <input type="number" id='precio' className='form-control' placeholder='Precio' value={precio} onChange={(e) => setprecio(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                        <input type='text' id='categoria' className='form-control' placeholder='Categoria' value={categoria} onChange={(e) => setcategoria(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                        <input type='text' id='dimensiones' className='form-control' placeholder='Dimensiones' value={dimensiones} onChange={(e) => setdimensiones(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                        <input type='number' id='existencias' className='form-control' placeholder='Existencias' value={existencias} onChange={(e) => setexistencias(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                        <input type='text' id='peso' className='form-control' placeholder='Peso' value={peso} onChange={(e) => setpeso(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                        <input type='file' id='imagen' className='form-control' placeholder='Imagen' onChange={_handleImageChange}></input>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' onClick={() => editProduct(prod_ac)}>Editar</button>
                    </div>
                </div>
            </div>
        </div>

        </div>
      )}
      </div>
      
  );
};

