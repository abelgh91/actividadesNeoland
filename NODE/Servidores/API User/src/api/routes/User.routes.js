const { upload } = require("../../middleware/files.middleware");
const register = require("../controllers/User.controllers");

const userRoutes = require("express").Router()

userRoutes.post('/register', upload.single('image'), register);
module.exports = userRoutes;