const { create } = require("../Controllers/Character.controllers");
const express = require("express")

const CharactersRoutes = express.Router();
CharactersRoutes.post("/", create);

module.exports = CharactersRoutes;