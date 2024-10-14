const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mondongo',
    password: 'hola',
    port: 5432,
});

module.exports = pool;
