const express = require("cors");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.listen(5000, () => {
    console.log("Servidor corriendo en el puerto 5000");
  });