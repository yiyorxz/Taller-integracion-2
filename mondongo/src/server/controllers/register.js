const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('./config/db'); // Asegúrate de que la conexión a la base de datos esté correctamente configurada
const app = express();

app.use(express.json()); // Asegúrate de que tu aplicación pueda manejar JSON

app.post('/register', async (req, res) => {
  const { contrasena, nombre, apellido, correo_email, telefono, rut } = req.body;

  try {
    // Verifica si el usuario ya existe
    const userExists = await pool.query('SELECT * FROM usuarios WHERE correo_email = $1', [correo_email]);
    
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Insertar el nuevo usuario en la base de datos
    await pool.query(
      'INSERT INTO usuarios (contrasena, nombre, apellido, correo_email, telefono, rut) VALUES ($1, $2, $3, $4, $5, $6)',
      [hashedPassword, nombre, apellido, correo_email, telefono, rut]
    );

    // Responder con éxito
    res.status(201).json({ message: 'Usuario registrado de manera exitosa' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Inicia el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
