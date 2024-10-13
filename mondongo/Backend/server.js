
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9000;
const cors = require('cors');
require('dotenv').config();
import pool from './db';
app.use(cors());
app.use(express());

app.get("/", (req, res) => {
  res.send("Ola");
});

app.get("/api/products", async(req, res) => {
  try{
    const result = await pool.query('SELECT * FROM producto');
    res.json(result.rows);
  } catch (err){
    console.error("error", err);
    res.status(see).send("error")
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on the port  ${PORT}`);
});
