const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://bfomesiitkrbzrdfamoi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmb21lc2lpdGtyYnpyZGZhbW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1NzE3ODgsImV4cCI6MjA0NDE0Nzc4OH0.k4q788PHlZDm7TvIorgrSDpIui82eRxH7xEMQmiP3Gk'; 
const supabase = createClient(supabaseUrl, supabaseKey);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de pedidos');
});

// Crear un pedido
app.post('/api/pedidos', async (req, res) => {
    const { Precio_Total, ID_Usuario, Direccion } = req.body;
  
    if (!Precio_Total || isNaN(Precio_Total) || !ID_Usuario || !Direccion) {
      return res.status(400).json({ error: 'Precio_Total debe ser un número y ID_Usuario y Direccion son requeridos' });
    }
  
    try {
      const { data, error } = await supabase
        .rpc('crear_pedido', { precio_total: Precio_Total, id_usuario: ID_Usuario, direccion: Direccion });
  
      if (error) throw error;
  
      res.status(201).json({ mensaje: 'Pedido creado exitosamente', pedido: data });
    } catch (error) {
      console.error('Error al crear pedido:', error);
      res.status(500).json({ error: 'Error al crear el pedido. Por favor, intenta de nuevo.' });
    }
  });  


// Obtener detalles de un pedido
app.get('/api/pedidos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .rpc('obtener_detalles_pedido', { pedido_id: id });  // Usa "pedido_id" aquí

        if (error) {
            if (error.message.includes('not found')) {
                return res.status(404).json({ error: 'Pedido no encontrado' });
            }
            throw error;
        }

        res.json({ pedido: data });
    } catch (error) {
        console.error('Error al obtener detalles del pedido:', error);
        res.status(500).json({ error: 'Error al obtener los detalles del pedido. Por favor, intenta de nuevo.' });
    }
});




// Obtener historial de un pedido
app.get('/api/pedidos/:id/historial', async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .rpc('obtener_historial_pedido', { pedido_id: id });  // Usa "pedido_id"

        if (error) {
            if (error.message.includes('not found')) {
                return res.status(404).json({ error: 'No se encontró historial para este pedido' });
            }
            throw error;
        }

        res.json({ historial: data });
    } catch (error) {
        console.error('Error al obtener historial del pedido:', error);
        res.status(500).json({ error: 'Error al obtener el historial del pedido. Por favor, intenta de nuevo.' });
    }
});

  

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
