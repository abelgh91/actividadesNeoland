const { isAuthAdmin } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");
const {
    crearParque, 
    getById, 
    getByName, 
    getAll, 
    update, 
    deleteParque,
    getCCAA,
    getProvincia, 
    getMasAves
} = require("../controllers/Parque.controllers");

const Parque = require("../models/Parque.model");

const ParqueRoutes = require("express").Router()

ParqueRoutes.post('/crear', upload.single('image'), crearParque);
ParqueRoutes.get('/:id', getById);
ParqueRoutes.get('/name/:name', getByName);
ParqueRoutes.get('/', getAll);
ParqueRoutes.get('/CCAA/:CCAA', getCCAA);
ParqueRoutes.get('/provincia/provincia/:provincia', getProvincia);
ParqueRoutes.get('/parquemasaves/parquemasaves', getMasAves);

//-------------CON AUTENTICACION-----------
ParqueRoutes.patch('/update/update', [isAuthAdmin], upload.single('image'), update);
ParqueRoutes.delete('/', [isAuthAdmin], deleteParque);

module.exports = ParqueRoutes;