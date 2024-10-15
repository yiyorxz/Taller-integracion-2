// App.js
import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [nombreProducto, setNombreProducto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [existencias, setExistencias] = useState('');
  const [categoria, setCategoria] = useState('');
  const [dimensiones, setDimensiones] = useState('');
  const [peso, setPeso] = useState('');
  const [mensaje, setMensaje] = useState('');

  const agregarProducto = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from('producto')
        .insert([
          {
            nombre_producto: nombreProducto,
            descripcion: descripcion,
            precio: parseFloat(precio),
            existencias: parseInt(existencias),
            categoria: categoria,
            dimensiones: dimensiones,
            peso: parseInt(peso),
          }
        ]);

      if (error) {
        console.error('Error al agregar producto:', error);
        setMensaje(`Error: ${error.message}`);
      } else {
        setMensaje('Producto agregado con éxito!');
        // Limpiar formulario después de agregar
        setNombreProducto('');
        setDescripcion('');
        setPrecio('');
        setExistencias('');
        setCategoria('');
        setDimensiones('');
        setPeso('');
      }
    } catch (error) {
      console.error('Error al conectar con Supabase:', error);
    }
  };

  return (
    <div className="App">
      <h1>Agregar Producto</h1>
      <form onSubmit={agregarProducto}>
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
          type="number"
          placeholder="Existencias"
          value={existencias}
          onChange={(e) => setExistencias(e.target.value)}
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
          placeholder="Peso"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
        />
        <button type="submit">Agregar Producto</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default App;
