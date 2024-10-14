require('dotenv').config();
const express = require('express');
const morgan = require("morgan")
const app = express();
const PORT = process.env.PORT || 9000;
const cors = require('cors');
const pool = require('./db');
app.use(cors());
app.use(express());
app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.send("Ola");
});

app.get("/api/products", async(req, res) => {
  try{
    const result = await pool.query('SELECT * FROM producto');
    res.json(result.rows);
  } catch (err){
    console.error("error", err);
    res.status(500).send("error")
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on the port  ${PORT}`);
});
