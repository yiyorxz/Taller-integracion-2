const { Pool } = require('pg');

const pool = new Pool({
  user: 'Postgres',          // Nombre de usuario de PostgreSQL
  host: 'localhost',         // Dirección del servidor (localhost si está en tu máquina)
  database: 'mandongo2',     // Nombre de la base de datos
  password: '1234', // Contraseña del usuario PostgreSQL
  port: 5432,                // Puerto de PostgreSQL (por defecto es 5432)
});

module.exports = pool;
