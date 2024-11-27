import React, { useState, useEffect } from 'react';
import { supabase } from './script1'; // Asegúrate de importar tu configuración de Supabase
import { useUser } from './UserContext'; // Usamos el contexto de usuario para acceder al usuario logueado
import './Puntuacion.css'; // Importamos el archivo CSS para este componente

function Puntuacion({ productoId }) {
  const { user } = useUser(); // Obtener el usuario logueado desde el contexto
  const [puntuacion, setPuntuacion] = useState(0); // Puntuación seleccionada
  const [puntuacionGuardada, setPuntuacionGuardada] = useState(0); // Puntuación previamente guardada
  const [mensaje, setMensaje] = useState('');

  // Cargar la puntuación del producto por el usuario
  useEffect(() => {
    const cargarPuntuacion = async () => {
      if (!user) return; // Si el usuario no está logueado, no se puede cargar puntuación

      const { data, error } = await supabase
        .from('puntuaciones')
        .select('puntuacion')
        .eq('id_producto', productoId)
        .eq('id_usuario', user.id_usuario)
        .single(); // Solo un resultado, ya que un usuario solo puede puntuar una vez

      if (error) {
        console.error('Error al cargar la puntuación:', error);
      } else if (data) {
        setPuntuacionGuardada(data.puntuacion); // Setear la puntuación guardada
        setPuntuacion(data.puntuacion); // Mostrar la puntuación actual en las estrellas
      }
    };

    cargarPuntuacion();
  }, [productoId, user]);

  // Función para manejar la selección de la puntuación
  const manejarPuntuacion = async (nuevaPuntuacion) => {
    if (!user) {
      setMensaje('Debes estar logueado para puntuar.');
      return;
    }

    // Si ya existe una puntuación, la actualizamos
    if (puntuacionGuardada !== 0) {
      const { data, error } = await supabase
        .from('puntuaciones')
        .update({ puntuacion: nuevaPuntuacion, fecha_puntuacion: new Date() })
        .eq('id_producto', productoId)
        .eq('id_usuario', user.id_usuario);

      if (error) {
        setMensaje('Error al actualizar la puntuación.');
        console.error('Error al actualizar puntuación:', error);
      } else {
        setPuntuacion(nuevaPuntuacion);
        setPuntuacionGuardada(nuevaPuntuacion);
        setMensaje('Puntuación actualizada correctamente.');
      }
    } else {
      // Si no hay puntuación previa, insertamos una nueva
      const { data, error } = await supabase
        .from('puntuaciones')
        .insert([{
          id_producto: productoId,
          id_usuario: user.id_usuario,
          puntuacion: nuevaPuntuacion,
          fecha_puntuacion: new Date(),
        }]);

      if (error) {
        setMensaje('Error al enviar la puntuación.');
        console.error('Error al insertar puntuación:', error);
      } else {
        setPuntuacion(nuevaPuntuacion);
        setPuntuacionGuardada(nuevaPuntuacion);
        setMensaje('Puntuación enviada correctamente.');
      }
    }
  };

  return (
    <div className="puntuacion-container">
      <h3>Puntuación</h3>

      {/* Mostrar las estrellas */}
      <div className="estrellas">
        {[1, 2, 3, 4, 5].map((estrella) => (
          <button
            key={estrella}
            onClick={() => manejarPuntuacion(estrella)}
            className={estrella <= puntuacion ? 'selected' : ''}
          >
            ★
          </button>
        ))}
      </div>

      {/* Mensaje de éxito o error */}
      {mensaje && <p>{mensaje}</p>}

      {/* Mostrar la puntuación actual si el usuario ya puntuó */}
      {puntuacionGuardada > 0 && (
        <div className="puntuacion-actual">
          <p>Tu puntuación actual: {puntuacionGuardada} estrellas</p>
        </div>
      )}
    </div>
  );
}

export default Puntuacion;
