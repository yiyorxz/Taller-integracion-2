const express = require('express');
const { supabase } = require('./supabaseclient');

const app = express();
app.use(express.json());

app.post('/api/agregar-pedido', async (req, res) => {
    const { id_pedido, fecha_pedido, precio_total, iva, direccion, id_usuario, id_tienda, id_despacho } = req.body;
  
    if (!id_pedido || !fecha_pedido || !precio_total || !iva || !direccion || !id_usuario || !id_tienda || !id_despacho) {
      return res.status(400).json({ error: 'Faltan campos requeridos en la solicitud' });
    }
  
    try {
      const { data, error } = await supabase
        .from('pedido')
        .insert([
          {
            id_pedido,
            fecha_pedido,
            precio_total,
            iva,
            direccion,
            id_usuario,
            id_tienda,
            id_despacho,
          },
        ])
        .select('*');  // muestra los datos insertados
  
      if (error) {
        console.error('Error al insertar en Supabase:', JSON.stringify(error, null, 2)); 
        return res.status(400).json({ error: error.message, details: error.details, hint: error.hint });
      }
  
      res.status(201).json({ message: 'Pedido agregado correctamente', pedido: data });
    } catch (err) {
      console.error('Error interno del servidor:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
