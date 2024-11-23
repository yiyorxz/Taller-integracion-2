import React, {useEffect, useState} from "react";

const fetchPopups = async (userId) => {
    const { data, error } = await supabase
      .from('descuentos')
      .select(`
        id_descuentos,
        id_producto,
        porcentaje_descuento,
        fecha_inicio,
        fecha_fin
        usuario (
          tipo_usuario
        )
      `)
      .eq('usuario.id', userId)
      .eq('usuario.tipo_usuario', 'comprador'); 
    return data;
};

const popup = () => {
    const [popups, setpopups] = useState([]);
    useEffect(() => {
        const fetchofertas = async () => {
            const ofertas = await fetchPopups(userId);
            setpopups(ofertas)
        };
        fetchofertas();
    });

    return(
        <div>
            {popups.map((popup, index) => {
                <div key={index}>
                    <h3>Oferta Especial!!</h3>
                    <p>el siguiente producto esta en oferta por tiempo limitado <br/>
                       Haga click abajo
                    </p>
                </div>    
            })}
        </div>
    )
}

export default popup;