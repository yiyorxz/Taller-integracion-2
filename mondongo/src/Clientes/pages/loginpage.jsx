import React, { useState } from 'react';
import { supabase } from '../Components/Conex/script1';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../Components/Conex/UserContext';
import './Login.css';


function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data: usuarios, error } = await supabase
      .from('usuario')
      .select('*')
      .eq('correo_email', correo)
      .eq('contrasena', contrasena);

    if (error || usuarios.length === 0) {
      setMensaje('Error: Credenciales inválidas');
    } else {
      const userData = usuarios[0];
      setMensaje('Inicio de sesión exitoso. Bienvenido ' + userData.nombre);
      setUser(userData);
      navigate('/home');
    }
  };

  return (
    <div>
      <div className="header">¡Inicia Sesión en MondongoGO!</div>
      <div className="container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
        {mensaje && <p>{mensaje}</p>}
        <p>
          ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </div>
      <div className="footer">© 2024 MondongoGO</div>
    </div>
  );
}

export default Login;
