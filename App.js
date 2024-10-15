// src/App.js

import React, { useState } from 'react';
import './App.css';
import { createClient } from '@supabase/supabase-js';

// Inicializa el cliente de Supabase
const supabaseUrl = 'https://xnshewhsuzhwozxeaocb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhuc2hld2hzdXpod296eGVhb2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5NTgzMDgsImV4cCI6MjA0NDUzNDMwOH0.vtVxn7xN5uRiA9fLUz-nls0Ot2Bz_OZ0EFzcr-aagcY';
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [nombreProducto, setNombreProducto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [existencias, setExistencias] = useState('');

  const agregarProducto = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('Producto')
      .insert([
        { Nombre_Producto: nombreProducto, Descripcion: descripcion, Precio: precio, Existencias: existencias }
      ]);

    if (error) {
      console.error('Error al agregar producto:', error);
    } else {
      console.log('Producto agregado:', data);
      // Limpia los campos después de agregar el producto
      setNombreProducto('');
      setDescripcion('');
      setPrecio('');
      setExistencias('');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestión de Productos</h1>
        <form onSubmit={agregarProducto}>
          <div>
            <label>Nombre del Producto:</label>
            <input
              type="text"
              value={nombreProducto}
              onChange={(e) => setNombreProducto(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Descripción:</label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Precio:</label>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Existencias:</label>
            <input
              type="number"
              value={existencias}
              onChange={(e) => setExistencias(e.target.value)}
              required
            />
          </div>
          <button type="submit">Agregar Producto</button>
        </form>
      </header>
    </div>
  );
}

export default App;
