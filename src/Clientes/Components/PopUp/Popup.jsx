import React, {useEffect, useState} from "react";
import { supabase } from "../Conex/script1";
import './Popup.css';
import { useNavigate } from 'react-router-dom';



const fetchPopups = async () => {
    const { data, error } = await supabase
            .from('descuentos')
            .select('*')

        if (error) {
            console.error("Error al obtener los datos:", error);
            return [];
        }

        return data || [];

};


const Popup = () => {
    const navigate = useNavigate();
    const [popups, setpopups] = useState([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    useEffect(() => {
        const fetchofertas = async () => {
            const ofertas = await fetchPopups();
              // Mostrar el pop-up solo si hay ofertas y actualmente no está visible
              if (ofertas.length > 0 && !isPopupVisible) {
                const randomoferta = ofertas[Math.floor(Math.random() * ofertas.length)];
                setpopups(randomoferta);
                setIsPopupVisible(true);
            }

        };
        fetchofertas();
    }, []); // Depender del estado de visibilidad del pop-up
    const redireccionar = (id) => {
        navigate(`/ElProducto/${id}`)
    }

    return (
        <div>
        {isPopupVisible && popups &&(
        
            <div className="modal">    
                <div className="modal-content">
                    <div className="modal-header">
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={() => setIsPopupVisible(false)}></button>
                    </div>
                        <div>
                            <h3>¡Oferta Especial!</h3>
                            <p>
                                El siguiente producto está en oferta por tiempo limitado. <br />
                                Haga clic abajo.
                            </p>
                            <p>Producto: {popups.id_producto}</p>
                            <p>Descuento: {popups.porcentaje_descuento}%</p>
                            <button type="button" class="btn btn-info" onClick={() => redireccionar(popups.id_producto)}>Ver Producto</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Popup;