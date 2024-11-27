import React from 'react';
import { useCart } from './cartcontext'; // Asegúrate de importar el hook useCart

const Carrito = () => {
  const { cartItems, total, countProducts, clearCart } = useCart();  // Usa el hook useCart

  return (
    <div>
      <h2>Tu Carrito</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item.id_producto}>
                {item.producto.nombre_producto} - ${item.producto.precio} x {item.cantidad}
              </li>
            ))}
          </ul>
          <p>Total: ${total}</p>
          <p>Cantidad de productos: {countProducts}</p>
          <button onClick={clearCart}>Vaciar carrito</button>
        </div>
      )}
    </div>
  );
};

export default Carrito;
