//traemos mongoose y la parte de los esquemas de datos
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

/*creamos los esquemas de datos y le ponemos a cada valor del objeto las caracteristicas que queramos
lo que sea required, longitu max o min, que sea unico o no, etc*/

const esquemaCharacter = new Schema (
    {
        name: {type: String, required: false, unique: false},
        gender: {
            type: String,
            enum: ["hombre", "mujer", "otro"],
            required: false
        },
        image: {
            type: String,
            required: false
        },
        movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  },
    {
        timestamp: true,
    }
);

// hacemos una funcion que guarde el modelo de datos y la exportamos

const Character = mongoose.model("Character", esquemaCharacter);

module.exports = Character;