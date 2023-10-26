const { crearMovie, toggleCharacter } = require("../Controllers/Movie.controllers");

const movieRoutes = require("express").Router();

movieRoutes.post("/", crearMovie);
movieRoutes.patch("/add/:id", toggleCharacter)


module.exports = movieRoutes;