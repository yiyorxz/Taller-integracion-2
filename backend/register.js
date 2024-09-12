const bcrypt = require('bcrypt');
const pool = require('./db'); // Configuración de conexión a PostgreSQL

// Registro de usuario
app.post('/register', async (req, res) => {
  const { nombre, apellido, correo, telefono, rut, contrasena } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10); // Hashear contraseña
    const newUser = await pool.query(
      'INSERT INTO "Usuario" (Nombre, Apellido, Correo_Email, Telefono, Rut, Contrasena) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      [nombre, apellido, correo, telefono, rut, hashedPassword]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
