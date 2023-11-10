const { isAuth } = require('../../middleware/auth.middleware');

const {crearComentario, borrarComentario} = require('../controllers/Comentario.controllers');
const Comentario = require('../models/Comentarios.model');


const ComentarioRoutes = require('express').Router();

ComentarioRoutes.post('/crearcomentario/:id', [isAuth], crearComentario);
ComentarioRoutes.delete('/borrarcomentario/:id', [isAuth], borrarComentario);

module.exports = ComentarioRoutes;