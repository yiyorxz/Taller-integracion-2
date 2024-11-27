import React, { useState } from 'react';
import { supabase } from '../Components/Conex/script1';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../Components/Conex/UserContext';
import './loginpage.css';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje(''); // Limpiar cualquier mensaje anterior

    try {
      console.log('Verificando usuario...');

      // Consultar la tabla de usuarios para verificar las credenciales
      const { data: usuarios, error } = await supabase
        .from('usuario')
        .select('id_usuario, correo_email, contrasena, nombre, tipo_usuario')
        .eq('correo_email', correo)
        .eq('contrasena', contrasena);

      if (error || usuarios.length === 0) {
        console.error('Error al verificar usuario:', error);
        setMensaje('Error: Credenciales inválidas');
        return;
      }

      const userData = usuarios[0];
      
      // Log de los datos de usuario para verificar la estructura
      console.log('Usuario encontrado:', userData);

      // Verificar que el ID del usuario esté correctamente asignado
      console.log('ID de usuario:', userData.id_usuario); // Cambié 'id' por 'id_usuario'

      // Verificar si el id_usuario es válido
      if (!userData.id_usuario) {
        console.error('El id_usuario es undefined');
        setMensaje('Error: El ID del usuario no es válido.');
        return;
      }

      setUser(userData);
      setMensaje('Inicio de sesión exitoso. Bienvenido ' + userData.nombre);

      // Verificar si el usuario tiene un carrito asociado
      console.log('Verificando carrito...');
      const { data: carrito, error: carritoError } = await supabase
        .from('carrito')
        .select('*')
        .eq('id_usuario', userData.id_usuario);  // Aquí también usamos id_usuario

      if (carritoError) {
        console.error('Error al consultar carrito:', carritoError.message);
        setMensaje('Error al verificar el carrito.');
        return;
      }

      let idCarrito; // Variable para almacenar el id del carrito

      // Si no se encuentra un carrito, creamos uno nuevo
      if (carrito.length === 0) {
        console.log('No se encontró carrito, creando uno nuevo...');
        const { data: newCarrito, error: newCarritoError } = await supabase
          .from('carrito')
          .insert([{ id_usuario: userData.id_usuario }])  // Usamos id_usuario aquí también
          .single();  // .single() asegura que solo se cree un registro

        if (newCarritoError) {
          console.error('Error al crear carrito:', newCarritoError.message);
          setMensaje('Error al crear el carrito');
          return;
        }

        // Asegurarse de que la respuesta contenga id_carrito
        if (newCarrito && newCarrito.id_carrito) {
          idCarrito = newCarrito.id_carrito; // Asignamos el id del nuevo carrito
          console.log('Carrito creado con éxito:', idCarrito);
        } else {
          console.error('El carrito creado no tiene id_carrito');
          setMensaje('Error: No se pudo asignar un carrito');
          return;
        }
      } else {
        // Si ya existe un carrito, usamos el id del carrito existente
        idCarrito = carrito[0].id_carrito;
        console.log('Carrito existente encontrado:', idCarrito);
      }

      // Redirigir según el tipo de usuario
      if (userData.tipo_usuario === 'cliente') {
        navigate('/home');
      } else if (userData.tipo_usuario === 'vendedor') {
        navigate('/homeven');
      }

    } catch (error) {
      console.error('Error inesperado:', error);
      setMensaje('Ocurrió un error inesperado. Por favor, intente nuevamente.');
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
        {mensaje && <p className="mensaje">{mensaje}</p>}
        <p>
          ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
      <div className="footer">© 2024 MondongoGO</div>
    </div>
  );
}

export default Login;
