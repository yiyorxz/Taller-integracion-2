// Modal.js
import React, { useEffect, useState } from 'react';
import { supabase } from "../Conex/script1"
import Lottie from 'react-lottie';
import animacion1 from '../Animaciones/Animation - 1730228916688.json'


const Crud = ({ isOpen, onClose }) => {
	
    const [showAnimation, setShowAnimation] = useState(false);
    const [nombre_producto, setnombre] = useState('');
    const [descripcion, setdescripcion] = useState('')
    const [precio, setprecio] = useState('')
    const [categoria, setcategoria] = useState('')
    const [dimensiones, setdimensiones] = useState('')
    const [existencias, setexistencias] = useState('')
    const [iva, setiva] = useState('')
    const [peso, setpeso] = useState('')
    const [fecha_creacion, setfecha] = useState('')
   
    const agrega= async () => {
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
            fecha_creacion,

        })
        if(error){
            console.error("error", console.error);
        }
        else{
            console.log("producto agregado");
            setShowAnimation(true);
            setTimeout(() => setShowAnimation(false), 2000);
        }
    }
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animacion1,
        rendererSettings:{
          preserveAspectRatio: 'xMidYMid slice'
        }
    };
    if (!isOpen) return null;
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
                            <input type='date' id='fecha' className='form-control' placeholder='Fecha' value={fecha_creacion} onChange={(e) => setfecha(e.target.value)}></input>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' onClick={agrega}>Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
              
      {showAnimation && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '78px',
          borderRadius: '10px'
        }}>
          <Lottie options={defaultOptions} height={150} width={150} />
          <p style={{ color: '#fff', textAlign: 'center', marginTop: '10px' }}>Producto agregado!</p>
        </div>
      )}

        </div>
	);
};

export default Crud;
