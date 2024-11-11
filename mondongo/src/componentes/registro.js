// src/componentes/registro.js
import React, { useState } from 'react';
import { supabase } from '../servicios/supabaseClient';
import { Link } from 'react-router-dom';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [rut, setRut] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('comprador');
  const [mensaje, setMensaje] = useState('');

  const handleRegistro = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from('usuario').insert([
      {
        nombre,
        apellido,
        correo_email: correo,
        telefono,
        direccion,
        rut,
        contrasena,
        tipo_usuario: tipoUsuario
      }
    ]);

    if (error) {
      console.error('Error al registrar usuario:', error.message);
      setMensaje('Error: ' + error.message);
    } else {
      setMensaje('Usuario registrado exitosamente.');
      setNombre('');
      setApellido('');
      setCorreo('');
      setTelefono('');
      setDireccion('');
      setRut('');
      setContrasena('');
      setTipoUsuario('comprador');
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleRegistro}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div>
          <label>Apellido:</label>
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
        </div>
        <div>
          <label>Correo electrónico:</label>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
        </div>
        <div>
          <label>Teléfono:</label>
          <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </div>
        <div>
          <label>Dirección:</label>
          <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
        </div>
        <div>
          <label>RUT:</label>
          <input type="text" value={rut} onChange={(e) => setRut(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
        </div>
        <div>
          <label>Tipo de usuario:</label>
          <select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)}>
            <option value="comprador">Comprador</option>
            <option value="vendedor">Vendedor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Registrarse</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
      <p>
        ¿Ya tienes una cuenta? <Link to="/">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}

export default Registro;