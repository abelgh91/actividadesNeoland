const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaAve = new Schema(
    {
        especie: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        types: {
            type: String,
            enum: ['rapaces', 'pajaros', 'corredoras', 'zancudas', 'gallinaceas', 'anseriformes'],
            required: false,
            trim: true
        },
        image: {
            type: String
        },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        visto: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        gender: {
            type: String,
            enum: ["macho", "hembra"],
            required: false
        },
        age: {
            type: String,
            enum: ['joven', 'adulto'],
            required: false
        },
        peligro: {
            type: Boolean,
            default: false
        },
        parque: [{ type: mongoose.Schema.Types.ObjectId, ref: "Parque" }],
        CCAA: {
            type: String,
            enum: ['Andalucia', 'Canarias', 'Catalunya', 'Baleares', 'Aragon', 'Asturias', 'Cantabria', 'Castilla y Leon', 'Castilla y la Mancha', 'Galicia', 'Madrid', 'Extremadura'],
            required: false
        },
        provincia: {
            type: String,
            enum: ['Tenerife', 'Las Palmas', 'Lleida', 'Mallorca', 'Huesca', 'Asturias', 'Cantabria', 'Leon', 'Ciudad Real', 'Toledo', 'Pontevedra', 'A Coruña', 'Huelva', 'Sevilla', 'Cadiz', 'Malaga', 'Madrid', 'Segovia', 'Caceres', 'Almeria', 'Granada'],
            required: false
        },
    },
    {
        timestamps: true,
    }
);

const Ave = mongoose.model('Ave', SchemaAve);
module.exports = Ave;