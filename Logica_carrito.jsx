// Añadir Productos al Carrito
import { supabase } from './supabaseClient';

const addToCart = async (userId, productId, quantity = 1) => {
  // Verificar si el carrito del usuario existe
  let { data: carrito, error } = await supabase
    .from('Carrito')
    .select('*')
    .eq('ID_Usuario', userId)
    .single();

  if (error && error.code === 'PGRST116') { // No existe el carrito
    const { data, error: insertError } = await supabase
      .from('Carrito')
      .insert([{ ID_Usuario: userId }])
      .single();
    
    if (insertError) {
      console.error('Error creando carrito:', insertError);
      return;
    }
    carrito = data;
  } else if (error) {
    console.error('Error obteniendo carrito:', error);
    return;
  }

  // Añadir o actualizar el producto en el carrito
  const { data, error: upsertError } = await supabase
    .from('Carrito_Producto')
    .upsert({
      ID_Carrito: carrito.ID_Carrito,
      ID_Producto: productId,
      Cantidad: quantity
    }, { onConflict: ['ID_Carrito', 'ID_Producto'] });

  if (upsertError) {
    console.error('Error añadiendo al carrito:', upsertError);
  } else {
    console.log('Producto añadido/actualizado en el carrito:', data);
  }
};
// Actualizar Productos en el carrito
const updateCartItem = async (userId, productId, newQuantity) => {
    // Obtener el carrito del usuario
    const { data: carrito, error: carritoError } = await supabase
      .from('Carrito')
      .select('*')
      .eq('ID_Usuario', userId)
      .single();
  
    if (carritoError) {
      console.error('Error obteniendo carrito:', carritoError);
      return;
    }
  
    // Actualizar la cantidad del producto
    const { data, error } = await supabase
      .from('Carrito_Producto')
      .update({ Cantidad: newQuantity })
      .eq('ID_Carrito', carrito.ID_Carrito)
      .eq('ID_Producto', productId);
  
    if (error) {
      console.error('Error actualizando el carrito:', error);
    } else {
      console.log('Cantidad actualizada en el carrito:', data);
    }
  };
// Limpiar el Carrito
const clearCart = async (userId) => {
    // Obtener el carrito del usuario
    const { data: carrito, error: carritoError } = await supabase
      .from('Carrito')
      .select('*')
      .eq('ID_Usuario', userId)
      .single();
  
    if (carritoError) {
      console.error('Error obteniendo carrito:', carritoError);
      return;
    }
  
    // Eliminar todos los productos del carrito
    const { data, error } = await supabase
      .from('Carrito_Producto')
      .delete()
      .eq('ID_Carrito', carrito.ID_Carrito);
  
    if (error) {
      console.error('Error limpiando el carrito:', error);
    } else {
      console.log('Carrito limpiado:', data);
    }
  };

// Obtener los Productos del Carrito
const getCartItems = async (userId) => {
    const { data: carrito, error: carritoError } = await supabase
      .from('Carrito')
      .select('*')
      .eq('ID_Usuario', userId)
      .single();
  
    if (carritoError) {
      console.error('Error obteniendo carrito:', carritoError);
      return [];
    }
  
    const { data, error } = await supabase
      .from('Carrito_Producto')
      .select(`
        ID_Producto,
        Cantidad,
        Producto (
          Nombre_Producto,
          Precio,
          Descripcion
        )
      `)
      .eq('ID_Carrito', carrito.ID_Carrito);
  
    if (error) {
      console.error('Error obteniendo productos del carrito:', error);
      return [];
    }
  
    return data;
  };
  