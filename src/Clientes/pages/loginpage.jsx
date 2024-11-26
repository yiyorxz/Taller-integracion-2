// src/componentes/login.js
import React, { useState } from 'react';
import { supabase } from '../Components/Conex/script1';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../Components/Conex/UserContext';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser(); // Obtén la función para actualizar el usuario

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data: usuarios, error } = await supabase
      .from('usuario')
      .select('*')
      .eq('correo_email', correo)
      .eq('contrasena', contrasena);

    if (error || usuarios.length === 0) {
      console.error('Error en autenticación:', error ? error.message : 'Credenciales inválidas');
      setMensaje('Error: Credenciales inválidas');
    } else {
      const userData = usuarios[0];
      setMensaje('Inicio de sesión exitoso. Bienvenido ' + userData.nombre);

      // Actualizar el contexto con los datos del usuario
      setUser(userData);

      // Redirigir a la página de inicio
      navigate('/home');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Correo electrónico:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
      <p>
        ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
      </p>
    </div>
  );
}

export default Login;