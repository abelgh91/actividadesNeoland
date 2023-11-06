const { isAuth, isAuthAdmin } = require("../../middleware/auth.middleware");
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
    getAll,
    addFavAve,
    addParqueVisitado,
    addAveVista,
    getLikesParque,
    getLikesAves
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
UserRoutes.patch('/update/update', [isAuthAdmin], upload.single('image'), update);
UserRoutes.delete('/', [isAuthAdmin], deleteUser);
UserRoutes.patch('/addfavparque', [isAuth], addFavParque);
UserRoutes.patch('/addfavave', [isAuth], addFavAve);
UserRoutes.patch('/addparquevisitado', [isAuth], addParqueVisitado);
UserRoutes.patch('/addavevista', [isAuth], addAveVista);
UserRoutes.get('/verlikesparques', [isAuth], getLikesParque);
UserRoutes.get('/verlikesaves', [isAuth], getLikesAves);

// ----------> controladores que se utilizan con redirect
UserRoutes.post("/register/sendMail/:id", sendCode);
UserRoutes.patch('/sendPassword/:id', sendPassword);
module.exports = UserRoutes;