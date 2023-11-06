const { isAuthAdmin } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");
const { crearAve, getAll, getById, getByName, update, deleteAve, avesPeligro } = require("../controllers/Ave.controllers");

const Ave = require("../models/Ave.model");

const AveRoutes = require("express").Router();

AveRoutes.post('/crear', upload.single('image'), crearAve);
AveRoutes.get('/', getAll);
AveRoutes.get('/:id', getById);
AveRoutes.get('/:name', getByName);
AveRoutes.get('/peligro/peligro', avesPeligro);

//-------------AUTENTICADOS
AveRoutes.patch('/update/update', [isAuthAdmin], upload.single('image'), update);
AveRoutes.delete('/', [isAuthAdmin], deleteAve); 

module.exports = AveRoutes;