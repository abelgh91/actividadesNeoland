const { create, getById, getAll, getByName } = require("../Controllers/Character.controllers");
const express = require("express")


const CharactersRoutes = express.Router();
CharactersRoutes.post("/", create);
CharactersRoutes.get("/:id", getById);
CharactersRoutes.get("/", getAll);
CharactersRoutes.get("/:name", getByName);



module.exports = CharactersRoutes;