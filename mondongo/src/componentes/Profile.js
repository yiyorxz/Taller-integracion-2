// src/componentes/Profile.js

import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

function Profile() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p>Nombre: {user.nombre}</p>
      <p>Apellido: {user.apellido}</p>
      <p>Correo: {user.correo_email}</p>
      <p>Teléfono: {user.telefono}</p>
      <p>Dirección: {user.direccion}</p>
      <Link to="/homepage">Volver al inicio</Link> {/* Enlace para regresar */}
    </div>
  );
}

export default Profile;
