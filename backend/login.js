const jwt = require('jsonwebtoken');
const secretKey = '1234'; // Utiliza una clave secreta segura

// Iniciar sesión
app.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const user = await pool.query('SELECT * FROM "Usuario" WHERE Correo_Email = $1', [correo]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // Comparar contraseña
    const validPassword = await bcrypt.compare(contrasena, user.rows[0].Contrasena);
    if (!validPassword) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Crear token JWT
    const token = jwt.sign({ id: user.rows[0].ID_Usuario }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
