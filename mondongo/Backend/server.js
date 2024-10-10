
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9000;
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express());

app.get("/", (req, res) => {
  res.send("Ola");
});



app.listen(PORT, () => {
  console.log(`Server listening on the port  ${PORT}`);
});
