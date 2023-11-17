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
    getLikesAves,
    follow,
    sortFollowers,
} = require("../controllers/User.controllers");
const User = require("../models/User.model");


const UserRoutes = require('express').Router()

UserRoutes.post('/register', upload.single('image'), register);
UserRoutes.post('/registerUtil', upload.single('image'), registerEstado);
UserRoutes.post('/registerRedirect',upload.single('image'), registerWithRedirect );
UserRoutes.post("/login", login);
UserRoutes.post('/login/autologin', autoLogin);
UserRoutes.post('/resend', resendCode);
UserRoutes.post('/check', checkNewUser);
UserRoutes.patch('/forgotpassword/forgotpassword', changePassword);
UserRoutes.get('/:id', getById);
UserRoutes.get('/name/:name', getByName);
UserRoutes.get('/', getAll);
UserRoutes.get('/sortfollowers/sort', sortFollowers);

//---------------controladores autenticados
UserRoutes.get('/pruebas', [isAuth], exampleAuth);
UserRoutes.patch('/changepassword', [isAuth], modifyPassword);
UserRoutes.patch('/update/:id', [isAuth], upload.single('image'), update);
UserRoutes.delete('/deleteuser/:id', [isAuthAdmin], deleteUser);
UserRoutes.patch('/addfavparque/:idParque', [isAuth], addFavParque);
UserRoutes.patch('/addfavave/:idAve', [isAuth], addFavAve);
UserRoutes.patch('/addparquevisitado/:idParque', [isAuth], addParqueVisitado);
UserRoutes.patch('/addavevista/:idAve', [isAuth], addAveVista);
UserRoutes.get('/verlikesaves/aves', [isAuth], getLikesAves);
UserRoutes.patch('/follow/:id', [isAuth], follow);
UserRoutes.get('/verlikesparques/parques', [isAuth], getLikesParque);

// ----------> controladores que se utilizan con redirect
UserRoutes.post('/register/sendMail/:id', sendCode);
UserRoutes.patch('/sendPassword/:id', sendPassword);
module.exports = UserRoutes;