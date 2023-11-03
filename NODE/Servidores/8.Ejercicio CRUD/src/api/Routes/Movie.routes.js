const { getAll } = require("../Controllers/Movie.controllers");
const { crearMovie, toggleCharacter, getById, getByName, update, eliminarMovie } = require("../Controllers/Movie.controllers");

const movieRoutes = require("express").Router();

movieRoutes.post("/", crearMovie);
movieRoutes.patch("/add/:id", toggleCharacter);
movieRoutes.get("/:id", getById);
movieRoutes.get("/", getAll);
movieRoutes.get("/byName/:name", getByName);
movieRoutes.patch("/:id", update);
movieRoutes.delete("/:id", eliminarMovie);


module.exports = movieRoutes;