const { isAuth } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");
const {register, 
    registerEstado, 
    registerWithRedirect, 
    sendCode, 
    login, 
    autoLogin, 
    exampleAuth, 
    resendCode, 
    checkNewUser, 
    changePassword, 
    sendPassword, 
    modifyPassword, 
    update, 
    deleteUser,
    addFavParque, 
    getById, 
    getByName, 
    getAll
} = require("../controllers/User.controllers");
const User = require("../models/User.model");

const UserRoutes = require("express").Router()

UserRoutes.post('/register', upload.single('image'), register);
UserRoutes.post('/registerUtil', upload.single('image'), registerEstado);
UserRoutes.post('/registerRedirect',upload.single('image'), registerWithRedirect );
UserRoutes.post("/login", login);
UserRoutes.post('/login/autologin', autoLogin);
UserRoutes.post('/resend', resendCode);
UserRoutes.post('/check', checkNewUser);
UserRoutes.patch('/forgotpassword/forgotpassword', changePassword);
UserRoutes.get("/:id", getById);
UserRoutes.get("/:name", getByName);
UserRoutes.get("/", getAll);

//---------------controladores autenticados
UserRoutes.get("/pruebas", [isAuth], exampleAuth);
UserRoutes.patch('/changepassword', [isAuth], modifyPassword);
UserRoutes.patch('/update/update', [isAuth], upload.single('image'), update);
UserRoutes.delete('/', [isAuth], deleteUser);
UserRoutes.patch('/addfavparque', [isAuth], addFavParque);

// ----------> controladores que se utilizan con redirect
UserRoutes.post("/register/sendMail/:id", sendCode);
UserRoutes.patch('/sendPassword/:id', sendPassword);
module.exports = UserRoutes;