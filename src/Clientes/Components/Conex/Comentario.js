import React, { useState, useEffect } from 'react';
import { supabase } from './script1'; // Configuración de Supabase
import { useUser } from './UserContext'; // Contexto para obtener el usuario logueado
import './Comentario.css'; // Importa el archivo CSS

function Comentario({ productoId }) {
  const { user } = useUser(); // Usuario actual
  const [comentarios, setComentarios] = useState([]);
  const [contenido, setContenido] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Cargar los comentarios del producto
  useEffect(() => {
    const cargarComentarios = async () => {
      const { data, error } = await supabase
        .from('comentarios')
        .select(`
          comentario,
          fecha_comentario,
          usuario:id_usuario (nombre, correo_email)
        `)
        .eq('id_producto', productoId)
        .order('fecha_comentario', { ascending: false });

      if (error) {
        console.error('Error al cargar los comentarios:', error);
      } else {
        setComentarios(data);
      }
    };

    cargarComentarios();
  }, [productoId]);

  // Manejar envío de comentario
  const manejarComentario = async (e) => {
    e.preventDefault();
  
    if (!contenido.trim()) {
      setMensaje('Por favor ingresa un comentario.');
      return;
    }
  
    if (!user) {
      setMensaje('Debes estar logueado para comentar.');
      return;
    }
  
    // Insertamos el comentario en la base de datos
    const { data, error } = await supabase
      .from('comentarios')
      .insert([{
        comentario: contenido,
        id_usuario: user.id_usuario, // Usamos el id_usuario del contexto
        id_producto: productoId, // Asociamos el comentario al producto
      }]);
  
    // Verificar si hay un error al insertar el comentario
    if (error) {
      setMensaje('Error al enviar el comentario.');
      console.error('Error al insertar comentario:', error);
    } else {
      setContenido(''); // Limpiar textarea
      setMensaje('Comentario enviado con éxito.');
  
      // Asegurarse de que 'data' no es nulo y tiene elementos
      if (data && data.length > 0) {
        setComentarios([data[0], ...comentarios]); // Añadir el nuevo comentario al principio
      } else {
        setMensaje('Error al agregar el comentario localmente.');
        console.error('El dato insertado no es válido:', data);
      }
    }
  };

  return (
    <div className="comentario-container">
      <h3>Comentarios</h3>

      {/* Formulario de comentarios */}
      {user ? (
        <form onSubmit={manejarComentario}>
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="Escribe tu comentario"
            required
          />
          <button type="submit">Comentar</button>
        </form>
      ) : (
        <p>Debes estar logueado para comentar.</p>
      )}

      {/* Mostrar mensaje de error o éxito */}
      {mensaje && <p>{mensaje}</p>}

      {/* Mostrar comentarios */}
      <div>
        {comentarios.length === 0 ? (
          <p>No hay comentarios aún.</p>
        ) : (
          comentarios.map((comentario, index) => (
            <div key={index} className="comentario">
              <strong>
                {comentario.usuario?.nombre} ({comentario.usuario?.correo_email}):
              </strong>
              <p>{comentario.comentario}</p>
              <span>{new Date(comentario.fecha_comentario).toLocaleString()}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Comentario;
