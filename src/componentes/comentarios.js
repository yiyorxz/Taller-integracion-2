// ReseñaConUsuario.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../servicios/supabaseClient';

const ReseñaConUsuario = ({ productId, userId }) => {
  const [userComment, setUserComment] = useState(''); // Comentario del usuario
  const [comments, setComments] = useState([]); // Comentarios para mostrar
  const [averageRating, setAverageRating] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Función para obtener los comentarios y las puntuaciones desde Supabase
    const fetchCommentsAndRatings = async () => {
      // Obtener los comentarios del producto
      const { data: commentData, error: commentError } = await supabase
        .from('comentarios') // Asegúrate de que la tabla de comentarios se llama 'comentarios'
        .select('*')
        .eq('id_producto', productId)
        .order('fecha_comentario', { ascending: false });

      if (commentError) {
        console.log('Error al obtener comentarios:', commentError);
      } else {
        setComments(commentData);
      }

      // Obtener las puntuaciones para calcular el promedio
      const { data: allRatings, error: allRatingsError } = await supabase
        .from('puntuaciones')
        .select('puntuacion')
        .eq('id_producto', productId);

      if (allRatingsError) {
        console.log('Error al obtener todas las puntuaciones:', allRatingsError);
      } else {
        const total = (allRatings || []).reduce((sum, rating) => sum + rating.puntuacion, 0);
        const average = (total / (allRatings.length || 1)).toFixed(1);
        setAverageRating(average);
      }
    };

    fetchCommentsAndRatings();
  }, [productId]);

  const handleAddComment = async () => {
    // Inserta un nuevo comentario
    const { error: insertError } = await supabase
      .from('comentarios') // Asegúrate de que la tabla de comentarios se llama 'comentarios'
      .insert([{ id_producto: productId, id_usuario: userId, comentario: userComment }]);

    if (insertError) {
      console.log('Error al añadir comentario:', insertError);
    } else {
      setSuccessMessage('Comentario publicado con éxito!');
      setComments([{ id_usuario: userId, comentario: userComment }, ...comments]); // Añade el nuevo comentario al inicio

      // Reinicia el campo de comentario
      setUserComment('');
    }

    // Oculta el mensaje de éxito después de 3 segundos
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleDeleteComment = async (commentId) => {
    // Elimina el comentario
    const { error: deleteError } = await supabase
      .from('comentarios')
      .delete()
      .eq('id_comentario', commentId);

    if (deleteError) {
      console.log('Error al eliminar comentario:', deleteError);
    } else {
      setComments(comments.filter(comment => comment.id_comentario !== commentId));
    }
  };

  return (
    <div>
      <h3>Comentarios para el producto {productId}</h3>
      {averageRating !== null ? (
        <p>Calificación promedio: {averageRating}</p>
      ) : (
        <p>Cargando calificación...</p>
      )}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div>
        <label>Comentario:</label>
        <textarea
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
          placeholder="Escribe tu comentario aquí..."
        />
      </div>
      <button onClick={handleAddComment}>Agregar Comentario</button>

      <h4>Comentarios:</h4>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id_comentario}>
            <p>{comment.comentario}</p>
            <button onClick={() => handleDeleteComment(comment.id_comentario)}>Eliminar</button>
          </div>
        ))
      ) : (
        <p>No hay comentarios aún.</p>
      )}
    </div>
  );
};

export default ReseñaConUsuario;
