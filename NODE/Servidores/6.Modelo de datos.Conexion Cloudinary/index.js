//------------IMPORTAR Y CONFIGURAR DOTENV

const express = require("express");
const dotenv = require("dotenv");
// const { connect } = require("mongoose");
dotenv.config();

//---------------TRAERNOS LA CONEXION DE LA DB ----> EJECUTAR LA FUNCION

const {connect} = require("./src/utils/db");
connect();

//----------CONFIGURAR CLOUDINARY

const { configCloudinary } = require("./src/middleware/files.middleware");
configCloudinary();

//-------------VARIABLES CONSTANTES -------->PORT

const PORT = process.env.PORT;

//----------CRERA SERVIDOR WEB

const app = express();

//------------LIMITACIONES DE CANTIDAD EN EL BACKEND

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));


//-----------------RUTAS

const CharacterRoutes = require("./src/api/routes/Character.routes");
app.use("/api/v1/characters/", CharacterRoutes);


//------------ERROR DE CUANDO NO SE ENCUENTRE LA RUTA

app.use("*", (req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    return next(error);
  });


  //----------CUANDO EL SERVIDOR CRASHEA METEMOS UN 500

  app.use((error, req, res) => {
    return res
      .status(error.status || 500)
      .json(error.message || "unexpected error");
  });

//-------------ESCUCHAMOS EN EL PUERTO EL SERVIDOR

app.disable("x-powered-by");
app.listen(PORT, ()=>
    console.log(`Server listening on port http://localhost:${PORT}`)
);

