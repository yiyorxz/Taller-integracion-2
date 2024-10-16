import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HistorialPedido = ({ idPedido }) => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const obtenerHistorial = async () => {
      try {
        const response = await axios.get(`/api/pedidos/${idPedido}/historial`);
        setHistorial(response.data);
      } catch (error) {
        console.error('Error al obtener historial:', error);
      }
    };

    obtenerHistorial();
  }, [idPedido]);

  return (
    <div>
      <h2>Historial del Pedido</h2>
      <ul>
        {historial.map((item) => (
          <li key={item.ID_Historial}>
            {item.Operacion} - {new Date(item.Fecha_Operacion).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistorialPedido;
