import React, { useState } from 'react';
import axios from 'axios';

const CrearPedido = () => {
  const [pedido, setPedido] = useState({
    Precio_Total: '',
    ID_Usuario: '',
    Direccion: ''
  });

  const handleChange = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/pedidos', pedido);
      console.log('Pedido creado:', response.data);
    } catch (error) {
      console.error('Error al crear pedido:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="Precio_Total" value={pedido.Precio_Total} onChange={handleChange} placeholder="Precio total" />
      <input type="text" name="ID_Usuario" value={pedido.ID_Usuario} onChange={handleChange} placeholder="ID del usuario" />
      <input type="text" name="Direccion" value={pedido.Direccion} onChange={handleChange} placeholder="Dirección" />
      <button type="submit">Crear Pedido</button>
    </form>
  );
};

export default CrearPedido;
