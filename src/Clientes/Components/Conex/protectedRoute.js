// src/permisos/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function ProtectedRoute({ role, route, children }) {
  const { user } = useUser();

  if (!user) {
    return <p>Cargando...</p>; // Mostrar mensaje mientras se carga el usuario
  }

  if (role !== user.tipo_usuario) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;