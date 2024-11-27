import React, { useState } from 'react';
import { supabase } from '../Components/Conex/script1';
import './Registerpage.css';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [rut, setRut] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('cliente'); // Valor predeterminado
  const [direccion, setDireccion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setErrorMessage(authError.message);
        return;
      }

      const { error: dbError } = await supabase.from('usuario').insert([
        {
          correo_email: email,
          contrasena: password, // Evita almacenar contraseñas en texto plano
          auth_id: authData.user.id,
          nombre,
          apellido,
          rut,
          telefono,
          tipo_usuario: tipoUsuario,
          direccion,
        },
      ]);

      if (dbError) {
        throw new Error('Error al registrar datos adicionales: ' + dbError.message);
      }

      setSuccessMessage('Registro exitoso. Revisa tu correo para confirmar tu cuenta.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <div className="header">¡Regístrate en MondongoGO!</div>
      <div className="container">
        <h2>Registrarse</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="RUT"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
          <select
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
          >
            <option value="cliente">Cliente</option>
            <option value="vendedor">Vendedor</option>
            <option value="admin">Administrador</option>
          </select>
          <button type="submit">Registrarse</button>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>
      <div className="footer">© 2024 MondongoGO</div>
    </div>
  );
};

export default SignUp;
