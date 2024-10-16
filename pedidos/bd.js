const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

app.use(express.json());

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres', 
  host: 'localhost',
  database: 'mondongo2',  
  password: '1234', 
  port: 5434,  
});

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de pedidos');
});

// Crear un pedido
app.post('/api/pedidos', async (req, res) => {
  const { Precio_Total, ID_Usuario, Direccion } = req.body;

  // Verificación de que los datos requeridos estén presentes y tengan el formato correcto
  if (!Precio_Total || isNaN(Precio_Total) || !ID_Usuario || !Direccion) {
    return res.status(400).json({ error: 'Precio_Total debe ser un número y ID_Usuario y Direccion son requeridos' });
  }
  
  try {
    // Insertar el nuevo pedido en la base de datos
    const result = await pool.query(
      'INSERT INTO Pedidos (Precio_Total, ID_Usuario, Direccion) VALUES ($1, $2, $3) RETURNING *',
      [Precio_Total, ID_Usuario, Direccion]
    );

    // Respuesta de éxito
    res.status(201).json({ mensaje: 'Pedido creado exitosamente', pedido: result.rows[0] });
  } catch (error) {
    console.error('Error al crear pedido:', error);

    // Respuesta de error, diferenciando entre errores de la base de datos o de otro tipo
    if (error.code === '23503') { // Clave foránea no encontrada 
      res.status(400).json({ error: 'El ID_Usuario no existe en la base de datos' });
    } else {
      res.status(500).json({ error: 'Error al crear el pedido. Por favor, intenta de nuevo.' });
    }
  }
});


// Actualizar un pedido
app.put('/api/pedidos/:id', async (req, res) => {
  const { id } = req.params;
  const { Precio_Total, Estado, Direccion } = req.body;

  // Verificación de que los datos requeridos estén presentes
  if (!Precio_Total || !Estado || !Direccion) {
    return res.status(400).json({ error: 'Precio_Total, Estado y Direccion son requeridos' });
  }

  // Verificar si el ID es un número válido
  const idNumerico = parseInt(id, 10);  // Convertir 'id' en un número entero
  if (isNaN(idNumerico)) {
    return res.status(400).json({ error: 'El ID debe ser un número válido' });
  }

  try {
    const result = await pool.query(
      'UPDATE Pedidos SET Precio_Total = $1, Estado = $2, Direccion = $3 WHERE ID_Pedido = $4 RETURNING *',
      [Precio_Total, Estado, Direccion, idNumerico]  // Usar 'idNumerico' en lugar de 'id'
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.json({ mensaje: 'Pedido actualizado exitosamente', pedido: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar pedido:', error);

    // Diferenciar entre error de conexión y error de la lógica
    if (error.code === '08001' || error.code === '08006') {
      res.status(500).json({ error: 'Error de conexión a la base de datos. Por favor, verifica la conexión.' });
    } else {
      // Mostrar detalles específicos del error
      res.status(500).json({ error: 'Error al actualizar el pedido.', detalles: error.message });
    }
  }
});


// Obtener historial de un pedido
app.get('/api/pedidos/:id/historial', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM Historial_Pedidos WHERE ID_Pedido = $1 ORDER BY Fecha_Operacion DESC',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'No se encontró historial para este pedido' });
    }

    res.json({ historial: result.rows });
  } catch (error) {
    console.error('Error al obtener historial del pedido:', error);
    res.status(500).json({ error: 'Error al obtener el historial del pedido. Por favor, intenta de nuevo.' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
