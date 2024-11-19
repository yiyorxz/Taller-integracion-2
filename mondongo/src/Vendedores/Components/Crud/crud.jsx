
import React, { useEffect, useState } from 'react';
import { supabase } from "../Conex/script1"
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../Animaciones/functions';


const Crud = ({ isOpen, onClose }) => {

	
    const [showAnimation, setShowAnimation] = useState(false);
    const [showAnimation2, setShowAnimation2] = useState(false);
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

    const agrega= async () => {

        if (nombre_producto.trim() === '' || descripcion.trim() === '' || precio.trim() === '' || categoria.trim() === '' || dimensiones.trim() === '' || existencias.trim() === '' || iva.trim() === '' || peso.trim() === ''){
            show_alerta('Error, hay datos sin rellenar, porfavor complete', 'warning');
            return;
        }
        const { error } = await supabase
        .from('producto')
        .insert({
            nombre_producto,
            descripcion,
            precio,
            categoria,
            dimensiones,
            existencias,
            iva,
            peso,
            imagen_producto: imagen_producto

        })
        if(error){
            console.error("error", console.error);
            show_alerta('No se pudo agregar el producto','error')
        }
        else{
            console.log("producto agregado");
            show_alerta('Producto Agregado Exitosamente','success')
        }
    }
        
	return (
        <div className='modal fade show' style={{ display: 'block' }}>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'></label>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={onClose}></button>    
                    </div>
                    <div className='modal-body'>
                        <h3>Agrega tu producto</h3>
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
                            <input type='number' id='iva' className='form-control' placeholder='Iva' value={iva} onChange={(e) => setiva(e.target.value)}></input>
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
                            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' onClick={agrega}  >Agregar</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
	);
}

export default Crud;
