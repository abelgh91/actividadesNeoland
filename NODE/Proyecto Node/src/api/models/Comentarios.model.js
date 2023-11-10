const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaComentarios = new Schema(
    {
        estrellas: {
            enum: [1, 2, 3, 4, 5],
            type: Number,
            required: true
        },
        comentario: {
            type: String
        },
        Parque: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Parque' }],
        ComentadoPor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        likeComentario: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    },
    {
        timestamps: true,
    }
);

const Comentario = mongoose.model('Comentario', SchemaComentarios);
module.exports = Comentario;