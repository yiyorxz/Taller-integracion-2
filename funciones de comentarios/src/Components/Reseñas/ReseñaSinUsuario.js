// ReseñaSinUsuario.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import styles from './ReseñaSinUsuario.module.css';

const ReseñaSinUsuario = ({ productId }) => {
  const [averageRating, setAverageRating] = useState(null);
  const [newRating, setNewRating] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [productName, setProductName] = useState(''); // Para almacenar el nombre del producto

  useEffect(() => {
    const fetchRatingsAndProductName = async () => {
      // Obtener el nombre del producto
      const { data: productData, error: productError } = await supabase
        .from('producto') // Asegúrate de que el nombre de la tabla coincide con tu base de datos
        .select('nombre_producto')
        .eq('id_producto', productId)
        .single();

      if (productError) {
        console.log('Error al obtener el nombre del producto:', productError);
      } else if (productData) {
        setProductName(productData.nombre_producto); // Guardar el nombre del producto en el estado
      }

      // Obtener las puntuaciones
      const { data, error } = await supabase
        .from('puntuaciones')
        .select('puntuacion')
        .eq('id_producto', productId);

      if (error) {
        console.log('Error al obtener reseñas:', error);
      } else {
        const ratings = data || [];
        const total = ratings.reduce((sum, rating) => sum + rating.puntuacion, 0);
        const average = ratings.length > 0 ? (total / ratings.length).toFixed(1) : 0;
        setAverageRating(average);
      }
    };

    fetchRatingsAndProductName();
  }, [productId]);

  const handleAddRating = async () => {
    const { data, error } = await supabase
      .from('puntuaciones')
      .insert([{ id_producto: productId, puntuacion: newRating }]);

    if (error) {
      console.log('Error al añadir reseña:', error);
    } else {
      setSuccessMessage('Reseña publicada con éxito!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      // Actualizar la calificación promedio después de añadir una reseña
      const updatedRatings = [...(averageRating ? [parseFloat(averageRating)] : []), newRating];
      const updatedTotal = updatedRatings.reduce((sum, rating) => sum + rating, 0);
      const updatedAverage = (updatedTotal / updatedRatings.length).toFixed(1);
      setAverageRating(updatedAverage);
    }
  };

  return (
    <div className={styles.contenedorReseña}>
      <h3 className={styles.tituloReseña}>Calificación total para: {productName || 'Cargando...'}</h3>
      {averageRating !== null ? (
        <p>Calificación promedio: {averageRating}</p>
      ) : (
        <p>Cargando calificación...</p>
      )}
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
      <div>
        <label>Puntuación:</label>
        <select
          value={newRating}
          onChange={(e) => setNewRating(parseInt(e.target.value, 10))}
          className={styles.inputReseña}
        >
          {[...Array(5)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAddRating} className={styles.botonEnviar}>Agregar Reseña</button>
    </div>
  );
};

export default ReseñaSinUsuario;
