// src/pages/ProductDetail.js
import React from 'react';
import Comments from '../componentes/ComentarioSinUsuario';
import Ratings from '../componentes/ReseñaSinUsuario';

const ProductDetail = ({ productId }) => {
  return (
    <div>
      <h2>Detalles del Producto</h2>
      <Ratings productId={productId} />
      <Comments productId={productId} />
    </div>
  );
};

export default ProductDetail;
