import React, { useEffect, useContext } from 'react';
import { UserContext } from './UserContext'; // Asegúrate de importar el contexto

function Protector({ children }) {
  const { user } = useContext(UserContext); // Obtener el usuario desde el contexto

  useEffect(() => {
    if (user) {
      // Imprimir el correo en la consola cuando el usuario esté logueado
      console.log(`Correo con el que estás logeado: ${user.correo_email}`);
    }
  }, [user]); // Se ejecutará cada vez que cambie el estado de 'user'

  if (!user) {
    // Si el usuario no está logueado, redirige o muestra un mensaje
    return <p>No estás autorizado para ver esta página.</p>;
  }

  // Si el usuario está logueado, renderiza los hijos (la página protegida)
  return <>{children}</>;
}

export default Protector;
