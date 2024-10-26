// ComentarioSinUsuario.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../servicios/supabaseClient';

const ComentarioSinUsuario = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [productName, setProductName] = useState(''); // Estado para el nombre del producto

  useEffect(() => {
    const fetchCommentsAndProductName = async () => {
      // Obtener el nombre del producto
      const { data: productData, error: productError } = await supabase
        .from('productos') // Asegúrate de que esta tabla se llama 'productos'
        .select('nombre')
        .eq('id_producto', productId)
        .single();

      if (productError) {
        console.log('Error al obtener el nombre del producto:', productError);
      } else if (productData) {
        setProductName(productData.nombre);
      }

      // Obtener los comentarios
      const { data, error } = await supabase
        .from('comentarios')
        .select('*')
        .eq('id_producto', productId);
      if (error) {
        console.log('Error al obtener comentarios:', error);
      } else {
        setComments(data || []);
      }
    };

    fetchCommentsAndProductName();
  }, [productId]);

  const handleAddComment = async () => {
    const { data, error } = await supabase
      .from('comentarios')
      .insert([{ id_producto: productId, comentario: newComment }]);

    if (error) {
      console.log('Error al añadir comentario:', error);
    } else {
      if (data && data.length > 0) {
        setComments((prevComments) => [...prevComments, data[0]]);
        setNewComment('');
        setSuccessMessage('Comentario publicado con éxito!');

        // Oculta el mensaje de éxito después de 3 segundos
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        console.log('No se pudo obtener el nuevo comentario.');
      }
    }
  };

  return (
    <div>
      <h3>Comentarios para: {productName || 'Cargando...'}</h3>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {comments.length === 0 ? (
        <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
      ) : (
        comments.map((comment) => (
          <p key={comment.id_comentario}>{comment.comentario}</p>
        ))
      )}
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Escribe un comentario..."
      />
      <button onClick={handleAddComment}>Agregar Comentario</button>
    </div>
  );
};

export default ComentarioSinUsuario;
