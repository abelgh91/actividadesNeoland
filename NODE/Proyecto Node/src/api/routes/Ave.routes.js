const { isAuthAdmin, isAuth } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");
const { crearAve, getAll, getById, getByName, update, deleteAve, avesPeligro, getTipos, getAge } = require("../controllers/Ave.controllers");

const Ave = require("../models/Ave.model");

const AveRoutes = require("express").Router();

AveRoutes.post('/crear', upload.single('image'), crearAve);
AveRoutes.get('/', getAll);
AveRoutes.get('/:id', getById);
AveRoutes.get('/:name', getByName);
AveRoutes.get('/peligro/peligro', avesPeligro);
AveRoutes.get('/types/:types', getTipos);
AveRoutes.get('/age/:age', getAge);

//-------------AUTENTICADOS
AveRoutes.patch('/update/:id', [isAuth], upload.single('image'), update);
AveRoutes.delete('/', [isAuth], deleteAve); 

module.exports = AveRoutes;