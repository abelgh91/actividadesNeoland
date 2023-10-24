//------------IMPORTAR Y CONFIGURAR DOTENV

const express = require("express");
const dotenv = require("dotenv");
// const { connect } = require("mongoose");
dotenv.config();

//---------------TRAERNOS LA CONEXION DE LA DB ----> EJECUTAR LA FUNCION

const {connect} = require("./src/utils/db");
connect()

//-------------VARIABLES CONSTANTES -------->PORT

const PORT = process.env.PORT;

//----------CRERA SERVIDOR WEB

const app = express();

//-------------ESCUCHAMOS EN EL PUERTO EL SERVIDOR

app.listen(PORT, ()=>
    console.log(`Server listening on port http://localhost:${PORT}`)
);

