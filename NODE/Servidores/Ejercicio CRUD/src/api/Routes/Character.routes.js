const { upload } = require("../../middleware/files.middleware");
const { create, getById, getAll, getByName, update, eliminarCharacter } = require("../Controllers/Character.controllers");
const express = require("express");

const CharactersRoutes = express.Router();
CharactersRoutes.post("/", upload.single("image"), create);
CharactersRoutes.get("/:id", getById);
CharactersRoutes.get("/", getAll);
CharactersRoutes.get("/byName/:name", getByName);
CharactersRoutes.patch("/:id", upload.single("image"), update);
CharactersRoutes.delete("/:id", eliminarCharacter);

module.exports = CharactersRoutes;