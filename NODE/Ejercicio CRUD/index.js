const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

// traemos la funcion connect y la ejecutamos en el index
const connect = require("./src/utils/db");

connect()

//traemos la configuracion de cloudinary y la ejectuamos en el index
const { configCloudinary } = require("./src/middleware/files.middleware");
configCloudinary();

//traemos PORT

const PORT = process.env.PORT;

//creamos servidor y metemos las CORS

const app = express();
//esto pone las cors por defecto,luego podemos meterle nosotros algunas mas especificas
const cors = require("cors");
app.use(cors());

//limitaciones de cantidad
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

//creamos rutas

const CharactersRoutes = require("./src/api/Routes/Characters.routes");
app.use("/api/v1/characters/", CharactersRoutes);

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

  //escuchamos el puerto
  app.listen(PORT, () => 
  console.log(`Server listening on port ✌ http://localhost: ${PORT}`)
  )