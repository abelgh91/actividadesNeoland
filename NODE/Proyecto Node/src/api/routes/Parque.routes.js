const { isAuthAdmin, isAuth } = require('../../middleware/auth.middleware');
const { upload } = require('../../middleware/files.middleware');
const {
    crearParque, 
    getById, 
    getByName, 
    getAll, 
    update, 
    deleteParque,
    getCCAA,
    getProvincia, 
    getMasAves,
    toggleParqueAve,
    sortSuperficie,
    sortLikes,
    sortVisitado,
    getMasSuperficie,
    getParqueConLikes,
} = require('../controllers/Parque.controllers');

const Parque = require('../models/Parque.model');

const ParqueRoutes = require("express").Router()

ParqueRoutes.post('/crear', upload.single('image'), crearParque);
ParqueRoutes.get('/:id', getById);
ParqueRoutes.get('/name/:name', getByName);
ParqueRoutes.get('/', getAll);
ParqueRoutes.get('/CCAA/:CCAA', getCCAA);
ParqueRoutes.get('/provincia/provincia/:provincia', getProvincia);
ParqueRoutes.get('/parquemasaves/parquemasaves', getMasAves);
ParqueRoutes.patch('/toggleparqueave/:id', toggleParqueAve);
ParqueRoutes.get('/sortsuperficie/sort', sortSuperficie);
ParqueRoutes.get('/sortlikes/sort', sortLikes);
ParqueRoutes.get('/sortvisitado/sort', sortVisitado);
ParqueRoutes.get('/massuperficie/superficie', getMasSuperficie);
ParqueRoutes.get('/parqueconlikes/likes', getParqueConLikes);

//-------------CON AUTENTICACION-----------
ParqueRoutes.patch('/update/:id', [isAuth], upload.single('image'), update);
ParqueRoutes.delete('/deleteparque/:id', [isAuth], deleteParque);

module.exports = ParqueRoutes;