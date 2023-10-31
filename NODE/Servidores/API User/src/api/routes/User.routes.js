const { isAuth } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");
const {register, registerEstado, registerWithRedirect, sendCode, login, autoLogin, exampleAuth, resendCode, checkNewUser, changePassword, sendPassword} = require("../controllers/User.controllers");
const user = require("../models/User.model");



const userRoutes = require("express").Router()

userRoutes.post('/register', upload.single('image'), register);
userRoutes.post('/registerUtil', upload.single('image'), registerEstado);
userRoutes.post('/registerRedirect',upload.single('image'), registerWithRedirect );
userRoutes.post("/login", login);
userRoutes.post('/login/autologin', autoLogin);
userRoutes.post('/resend', resendCode);
userRoutes.post('/check', checkNewUser);
userRoutes.patch('/forgotpassword/forgotpassword', changePassword);

//---------------controladores autenticados
userRoutes.get("/pruebas", [isAuth], exampleAuth);

// ----------> controladores que se utilizan con redirect
userRoutes.post("/register/sendMail/:id", sendCode);
userRoutes.patch('/sendPassword/:id', sendPassword);
module.exports = userRoutes;