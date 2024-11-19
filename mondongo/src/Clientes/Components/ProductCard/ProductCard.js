// ProductCard.js
import React from 'react';
import './ProductCard.css';
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.name}</p>
    </div>
  );
};

export default ProductCard;
