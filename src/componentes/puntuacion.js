import React, { useEffect, useState } from 'react';
import { supabase } from '../servicios/supabaseClient';

const Ratings = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(null);

  useEffect(() => {
    // Función para obtener la puntuación promedio
    const fetchRating = async () => {
      let { data, error } = await supabase
        .from('puntuaciones')
        .select('puntuacion')
        .eq('id_producto', productId);

      if (error) console.log('Error al obtener puntuación:', error);
      else {
        const total = data.reduce((acc, item) => acc + item.puntuacion, 0);
        setRating(data.length ? total / data.length : 0);
      }
    };

    fetchRating();
  }, [productId]);

  const handleUserRating = async (score) => {
    const { error } = await supabase
      .from('puntuaciones')
      .insert([{ id_producto: productId, id_usuario: supabase.auth.user().id, puntuacion: score }]);

    if (error) console.log('Error al añadir puntuación:', error);
    else setUserRating(score);
  };

  return (
    <div>
      <h3>Puntuación: {rating.toFixed(1)}</h3>
      <div>
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            onClick={() => handleUserRating(score)}
            disabled={userRating !== null}
          >
            {score} Estrella{score > 1 ? 's' : ''}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Ratings;
