// ReseñaSinUsuario.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../servicios/supabaseClient';

const ReseñaSinUsuario = ({ productId }) => {
  const [averageRating, setAverageRating] = useState(null);
  const [newRating, setNewRating] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [productName, setProductName] = useState(''); // Estado para el nombre del producto

  useEffect(() => {
    const fetchRatingsAndProductName = async () => {
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

      // Función para obtener las reseñas y calcular el promedio
      const { data, error } = await supabase
        .from('puntuaciones') // Verifica que el nombre de la tabla sea correcto
        .select('puntuacion')
        .eq('id_producto', productId);

      if (error) {
        console.log('Error al obtener reseñas:', error);
      } else {
        const ratings = data || [];
        if (ratings.length > 0) {
          const total = ratings.reduce((sum, rating) => sum + rating.puntuacion, 0);
          const average = (total / ratings.length).toFixed(1); // Calcula el promedio
          setAverageRating(average);
        } else {
          setAverageRating(0); // Si no hay reseñas, mostrar 0
        }
      }
    };

    fetchRatingsAndProductName();
  }, [productId]);

  const handleAddRating = async () => {
    // Agrega la reseña (puntuación) sin autenticación
    const { data, error } = await supabase
      .from('puntuaciones') // Verifica que el nombre de la tabla sea correcto
      .insert([{ id_producto: productId, puntuacion: newRating }]);

    if (error) {
      console.log('Error al añadir reseña:', error);
    } else {
      if (data && data.length > 0) {
        setSuccessMessage('Reseña publicada con éxito!');

        // Actualiza el promedio después de agregar una nueva reseña
        const updatedRatings = await supabase
          .from('puntuaciones')
          .select('puntuacion')
          .eq('id_producto', productId);

        if (updatedRatings.data) {
          const total = updatedRatings.data.reduce((sum, rating) => sum + rating.puntuacion, 0);
          const average = (total / updatedRatings.data.length).toFixed(1);
          setAverageRating(average);
        }

        // Oculta el mensaje de éxito después de 3 segundos
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        console.log('No se pudo obtener la nueva reseña.');
      }
    }
  };

  return (
    <div>
      <h3>Calificación total para: {productName || 'Cargando...'}</h3>
      {averageRating !== null ? (
        <p>Calificación promedio: {averageRating}</p>
      ) : (
        <p>Cargando calificación...</p>
      )}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div>
        <label>Puntuación:</label>
        <select value={newRating} onChange={(e) => setNewRating(parseInt(e.target.value, 10))}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <button onClick={handleAddRating}>Agregar Reseña</button>
    </div>
  );
};

export default ReseñaSinUsuario;
