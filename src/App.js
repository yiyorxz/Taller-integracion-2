// src/App.js
import React from 'react';
import ProductDetail from './paginas/detallesDeProductos';

function App() {
  return (
    <div className="App">
      <ProductDetail productId={1} />
    </div>
  );
}

export default App;
