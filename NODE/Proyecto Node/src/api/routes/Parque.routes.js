const { upload } = require("../../middleware/files.middleware");
const {
    crearParque, 
    getById, 
    getByName, 
    getAll, 
    update, 
    deleteParque,
} = require("../controllers/Parque.controllers");
const Parque = require("../models/Parque.model");

const ParqueRoutes = require("express").Router()

ParqueRoutes.post('/crear', upload.single('image'), crearParque);
ParqueRoutes.get('/:id', getById);
ParqueRoutes.get('/:name', getByName);
ParqueRoutes.get('/', getAll);
ParqueRoutes.patch('/update/update', upload.single('image'), update);

ParqueRoutes.delete('/', deleteParque); // No se si tiene que tener autenticacion

module.exports = ParqueRoutes;