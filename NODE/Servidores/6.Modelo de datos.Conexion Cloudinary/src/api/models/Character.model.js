//------------REQUERIR MONGOOSE

const mongoose = require("mongoose");

//----------NOS TRAEMOS DE MONGOOSE LA PARTE DE LOS ESQUEMAS DE DATOS

const Schema = mongoose.Schema;

//-----------CREAR LOS ESQUEMAS

//Definir el modelo de datos: dale a cada clave el tipo de dato, y definimos otras propiedades que limitan la info que se puede incluir en esa clave
//ejemplo: que sea requerido, longitud maxima, que sea true o false...

const CharacterSchema = new Schema(
    {
        name: { type: String, required: false, unique: false},
        gender: {
            type: String,
            enum: ["hombre", "mujer", "otros"],
            required: false,
        },
        image: {
            type: String,
            required: false,
        },
        movies: [{type: mongoose.Schema.Types.ObjectId, ref: "Movie"}],
    },
    {
        timestamps: true,
    }
);


//--------HEMOS HECHO LA DEFINICION DE DATOS, AHORA EL MODELO DE DATOS

const Character = mongoose.model("Character", CharacterSchema);

//-----------------EXPORTAMOS EL MODELO PARA LOS CONTROLADORES

module.exports = Character;