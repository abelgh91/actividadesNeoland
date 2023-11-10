const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaParque = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    image: {
      type: String,
    },
    CCAA: {
      type: String,
      enum: ['Andalucia', 'Canarias', 'Catalunya', 'Baleares', 'Aragon', 'Asturias', 'Cantabria', 'Castilla y Leon', 'Castilla y la Mancha', 'Galicia', 'Madrid', 'Extremadura'],
      required: false,
    },
    provincia: {
      type: String,
      enum: ['Tenerife', 'Las Palmas', 'Lleida', 'Mallorca', 'Huesca', 'Asturias', 'Cantabria', 'Leon', 'Ciudad Real', 'Toledo', 'Pontevedra', 'A Coruña', 'Huelva', 'Sevilla', 'Cadiz', 'Malaga', 'Madrid', 'Segovia', 'Caceres', 'Almeria', 'Granada'],
      required: false,
    },
    superficie: {
      type: Number,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    visitado: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    aves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ave' }],
  },
  {
    timestamps: true,
  }
);

const Parque = mongoose.model('Parque', SchemaParque);
module.exports = Parque;
