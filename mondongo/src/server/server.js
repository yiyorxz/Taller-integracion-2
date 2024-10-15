require('dotenv').config();
const express = require('express');
const { Pool } = require ('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwbtoken');

const app = express();
app.use (express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

pool.connect((err)=>{
    if (err){
        console.error('error con la conexion a la base de datos', err);
    } else {
        console.log('Se conecto a la base de datos en postgree')
    }
})