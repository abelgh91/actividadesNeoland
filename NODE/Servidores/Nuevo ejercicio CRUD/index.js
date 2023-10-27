const express = require("express")
const dotenv = require("dotenv");

dotenv.config();

//funcion que conecta con la DB
const connect = require("./src/utils/db");
connect();

//config de cloudinary
const { configCloudinary } = require("./src/middleware/files.middleware");
configCloudinary();

//PORT
const PORT = process.env.PORT

//Creamos servidor
const app = express();
const cors = require("cors");
app.use(cors());

//Limitaciones de cantidad
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

//Traemos la rutas cuando la tengamos



//creamos una funcion para que gestione cuando no encuentre la ruta(404) y otra para cuando crashee(500)

app.use("*", (req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    return next(error);
  });

  app.use((error, req, res) => {
    return res
      .status(error.status || 500)
      .json(error.message || "unexpected error");
  });

  //Escuchamos el puerto

  app.listen(PORT,()=>
  console.log(`Server listening on PORT 👌 http://localhost: ${PORT}`));