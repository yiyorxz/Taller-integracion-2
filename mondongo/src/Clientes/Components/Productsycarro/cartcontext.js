// CartContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../Conex/script1'; // Ajusta la ruta a tu cliente supabase

export const CartContext = createContext();

export const CartProvider = ({ children, userId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);

  useEffect(() => {
    if (userId) fetchCartItems();
  }, [userId]);

  const fetchCartItems = async () => {
    const { data, error } = await supabase
      .from('carrito_producto')
      .select(`
        id_producto,
        cantidad,
        producto:producto_id (
          nombre_producto,
          precio
        )
      `)
      .eq('id_carrito', userId);

    if (!error) {
      setCartItems(data);
      calculateTotal(data);
      calculateCount(data);
    }
  };

  const calculateTotal = (items) => {
    const totalAmount = items.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
    setTotal(totalAmount);
  };

  const calculateCount = (items) => {
    const count = items.reduce((acc, item) => acc + item.cantidad, 0);
    setCountProducts(count);
  };

  const addToCart = async (productoId, cantidad = 1) => {
    const existingProduct = cartItems.find((item) => item.id_producto === productoId);
    if (existingProduct) {
      const { data, error } = await supabase
        .from('carrito_producto')
        .update({ cantidad: existingProduct.cantidad + cantidad })
        .eq('id_producto', productoId)
        .eq('id_carrito', userId);

      if (!error) {
        fetchCartItems();
      }
    } else {
      const { data, error } = await supabase
        .from('carrito_producto')
        .insert([{ id_carrito: userId, id_producto: productoId, cantidad }]);

      if (!error) {
        fetchCartItems();
      }
    }
  };

  const clearCart = async () => {
    const { error } = await supabase
      .from('carrito_producto')
      .delete()
      .eq('id_carrito', userId);

    if (!error) {
      setCartItems([]);
      setTotal(0);
      setCountProducts(0);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, total, countProducts, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
