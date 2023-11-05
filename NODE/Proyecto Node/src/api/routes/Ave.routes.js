const { upload } = require("../../middleware/files.middleware");
const { crearAve, getAll, getById, getByName, update, deleteAve } = require("../controllers/Ave.controllers");

const Ave = require("../models/Ave.model");

const AveRoutes = require("express").Router();

AveRoutes.post('crear', upload.single('image'), crearAve);
AveRoutes.get('/', getAll);
AveRoutes.get('/:id', getById);
AveRoutes.get('/:name', getByName);
AveRoutes.patch('/update/update', upload.single('image'), update);

AveRoutes.delete('/', deleteAve); // No se si tiene que tener autenticacion

module.exports = AveRoutes;