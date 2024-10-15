// src/AddProduct.js

import React, { useState } from 'react';
import { supabase } from './supabaseClient';

const AddProduct = () => {
  const [nombreProducto, setNombreProducto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [dimensiones, setDimensiones] = useState('');
  const [existencias, setExistencias] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('producto') // Cambiar a minúsculas
      .insert([
        {
          nombre_producto: nombreProducto, // Cambiar a minúsculas
          descripcion: descripcion, // Cambiar a minúsculas
          precio: parseFloat(precio), // Cambiar a minúsculas
          categoria: categoria, // Cambiar a minúsculas
          dimensiones: dimensiones, // Cambiar a minúsculas
          existencias: parseInt(existencias), // Cambiar a minúsculas
        },
      ]);

    if (error) {
      console.error('Error al agregar el producto:', error);
    } else {
      console.log('Producto agregado:', data);
      // Limpiar el formulario
      setNombreProducto('');
      setDescripcion('');
      setPrecio('');
      setCategoria('');
      setDimensiones('');
      setExistencias('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Producto</h2>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={nombreProducto}
        onChange={(e) => setNombreProducto(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Categoría"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />
      <input
        type="text"
        placeholder="Dimensiones"
        value={dimensiones}
        onChange={(e) => setDimensiones(e.target.value)}
      />
      <input
        type="number"
        placeholder="Existencias"
        value={existencias}
        onChange={(e) => setExistencias(e.target.value)}
        required
      />
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default AddProduct;
