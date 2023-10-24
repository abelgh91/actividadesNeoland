const { upload } = require("../../middleware/files.middleware");
const { create } = require("../controllers/Character.controllers");

const CharacterRoutes = require("express").Router();


//EN MEDIO DE LA RUTA Y LA FUNCION, QUE ES EL CONTROLADOR create, ESTA EL MIDDLEWARE DE SUBIDA DE FICHEROS A CLOUDINARY
CharacterRoutes.post("/", upload.single("image"), create);

module.exports = CharacterRoutes;