const { isAuth } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");
const {register, registerEstado, registerWithRedirect, sendCode, login, exampleAuth} = require("../controllers/User.controllers");
const user = require("../models/User.model");



const userRoutes = require("express").Router()

userRoutes.post('/register', upload.single('image'), register);
userRoutes.post('/registerUtil', upload.single('image'), registerEstado)
userRoutes.post('/registerRedirect',upload.single('image'), registerWithRedirect )
userRoutes.post("/login", login)
userRoutes.get("/pruebas", [isAuth], exampleAuth)

// ----------> controladores que se utilizan con redirect
userRoutes.post("/register/sendMail/:id", sendCode)

module.exports = userRoutes;