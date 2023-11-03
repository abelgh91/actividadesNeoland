const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

//--------funcion que conecta con la base de datos

const connect = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI, {
      // para hacer que la URL de MONGO se parsee correctamente
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // destructuring de db.connection porque esa funcion dentro tiene valores name y host
    const { name, host } = db.connection;

    console.log(
      `Conectada la Base de Datos👍 con el host: ${host} con el nombre: ${name}`
    );
  } catch (error) {
    console.log('Tenemos un problema al conectar la Base de Datos🤦‍♂️', error);
  }
};

module.exports = connect;
