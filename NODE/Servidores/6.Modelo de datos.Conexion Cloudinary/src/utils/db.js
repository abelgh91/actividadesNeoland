//-------------REQUERIR DOTENV Y MONGOOSE

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");


//----------TRAEMOS MONGO_URI DEL .ENV

const MONGO_URI = process.env.MONGO_URI

//-------------CREAMOS LA FUNCION QUE CONECTA CON LA BASE DE DATOS DE MONGO DB

const connect = async() => {
    try {
        const db = await mongoose.connect(MONGO_URI, {
                /// es para hacer que la URL de MONGO se parsee
                useNewUrlParser: true,
                // convertir los caracteres especiales
                useUnifiedTopology: true,
        });

        const {name, host} = db.connection

        console.log(`Conectada la BD con el HOST: ${host} con el nombre ${name}`)
    } catch (error) {
        console.log("tenemos un error con la conexion a la DB ", error)
    }
};

module.exports = { connect }