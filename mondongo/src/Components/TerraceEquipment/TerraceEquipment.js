import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './TerraceEquipment.css';  
const TerraceEquipment = () => {
  const products = [
    { id: 1, name: 'Producto 1', imageUrl: 'https://www.bricsa.cl/wp-content/uploads/2021/07/B6A1567.jpg' },
    { id: 2, name: 'Producto 2', imageUrl: 'https://www.bricsa.cl/wp-content/uploads/2021/07/B6A1567.jpg' },
  ];

  return (
    <div className="terrace-equipment">
      <h2>Productos
      </h2>
      <div className="product-list">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default TerraceEquipment;
