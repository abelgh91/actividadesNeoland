const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const connect = async () => {
    try {
        const db = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });

        const {name, host} = db.connection;
        console.log(`Conectado a la DB ✔ con el host: ${host}, con el nombre ${name}`)
    } catch (error) {
        console.log(`Error al conectar la DB ❌`, error)
    }
};

module.exports = connect