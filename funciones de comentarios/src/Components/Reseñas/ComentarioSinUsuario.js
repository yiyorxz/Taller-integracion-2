// ComentarioSinUsuario.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import styles from './ComentarioSinUsuario.module.css';

const ComentarioSinUsuario = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [productName, setProductName] = useState(''); // Para almacenar el nombre del producto

  useEffect(() => {
    const fetchCommentsAndProductName = async () => {
      // Verifica si productId está presente
      if (!productId) {
        console.warn('Product ID no proporcionado');
        return;
      }

      console.log("ID del producto recibido:", productId);

      // Obtener el nombre del producto
      const { data: productData, error: productError } = await supabase
        .from('producto') // Asegúrate de que el nombre de la tabla coincide con tu base de datos
        .select('nombre_producto')
        .eq('id_producto', productId)
        .single();

      if (productError) {
        console.error('Error al obtener el nombre del producto:', productError);
      } else if (productData) {
        console.log('Producto obtenido:', productData);
        setProductName(productData.nombre_producto); // Guardar el nombre del producto en el estado
      }

      // Obtener los comentarios
      const { data, error } = await supabase
        .from('comentarios')
        .select('*')
        .eq('id_producto', productId);

      if (error) {
        console.error('Error al obtener comentarios:', error);
      } else {
        console.log('Comentarios obtenidos:', data);
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
      console.error('Error al añadir comentario:', error);
    } else {
      if (data && data.length > 0) {
        setComments((prevComments) => [...prevComments, data[0]]);
        setNewComment('');
        setSuccessMessage('Comentario publicado con éxito!');

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    }
  };

  return (
    <div className={styles.contenedorComentario}>
      <h3 className={styles.tituloComentario}>Comentarios para: {productName || 'Cargando...'}</h3>
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
      {comments.length === 0 ? (
        <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
      ) : (
        <div className={styles.listaComentarios}>
          {comments.map((comment) => (
            <p key={comment.id_comentario} className={styles.comentario}>{comment.comentario}</p>
          ))}
        </div>
      )}
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Escribe un comentario..."
        className={styles.inputComentario}
      />
      <button onClick={handleAddComment} className={styles.botonEnviar}>Agregar Comentario</button>
    </div>
  );
};

export default ComentarioSinUsuario;
