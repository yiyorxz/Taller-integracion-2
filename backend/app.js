const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const cors = require('cors');  // Importar cors

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Middleware para procesar JSON en solicitudes
app.use(express.json());

// Clave secreta para JWT
const secretKey = '1234'; // Cambia esto por una clave segura

// Registro de usuario
app.post('/register', async (req, res) => {
  const { nombre, apellido, correo, telefono, rut, contrasena } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const newUser = await pool.query(
      'INSERT INTO "Usuario" (Nombre, Apellido, Correo_Email, Telefono, Rut, Contrasena) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      [nombre, apellido, correo, telefono, rut, hashedPassword]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar sesión
app.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const user = await pool.query('SELECT * FROM "Usuario" WHERE Correo_Email = $1', [correo]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(contrasena, user.rows[0].Contrasena);
    if (!validPassword) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.rows[0].ID_Usuario }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware para verificar JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Acceso denegado' });

  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token inválido' });
  }
};

// Ruta protegida
app.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await pool.query('SELECT * FROM "Usuario" WHERE ID_Usuario = $1', [req.user.id]);
    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
