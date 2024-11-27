import React from 'react';
import { Link } from 'react-router-dom';

function Categories() {
  const categories = [
    { id: 1, name: 'Frutas', path: '/category/electronica' },
    { id: 2, name: 'Verduras', path: '/category/moda' },
    { id: 3, name: 'Carnes', path: '/category/hogar' },
  ];

  return (
    <section className="categories">
      <h2>Categorías</h2>
      <div className="category-grid">
        {categories.map(category => (
          <div key={category.id} className="category-card">
            <Link to={category.path}>{category.name}</Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
