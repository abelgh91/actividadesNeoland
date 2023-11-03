/** comprobar que la persona que entra a las rutas autenticadas este autorizada para hacerlo 
 * El metodo que utiliza para ello es un Token que lo genera la libreria JSON web token
  */

// ------------> necesitamos el modelo porque necesitamos saber que rol tiene ese usuario
const User = require('../api/models/User.model');
const { verifyToken } = require('../utils/token');
const dotenv = require('dotenv');
dotenv.config();

//---------- la primera funcion para saber si esta autenticado ------------

const isAuth = async (req, res, next) => {
  /** el token se envia por las headers de la peticion
   * Y se envia como un Bearer token 
   * por eso lo primero que tenemos que hacer es reemplazar la palabra Bearer por un espacio vacio
   * para que luego JSON web token me lo reconozca correctamente sin la palabra bearer 
   */
  const token = req.headers.authorization?.replace('Bearer ', '');

  //** si no tengo token genero un error y se lo mando al user */
  if (!token) {
    return next(new Error('Unauthorized'));
  }

  try {
    // verifyToken nos devuelve la info que le dimos para crear el token (email, id )
    // en el decoded tendremos un objeto con el id y email
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    console.log(decoded)
    /** decoded = {id , email}----> acordaros del jwt.sign que le pasamos un id y un email */

    //! ----------> decodificamos para hacer un req.user para saber que usuario esta autenticado en ese momento
    /** vamos a buscar el usuario por id gracias a que hemos decodificado el token y hemos sacado id y email 
     * una vez encontrado el usuario por id lo guardamos en el req.user 
     * req.user nos va a servir para saber que es un usuario autenticado porque para llegar a hacer la req.user hemos 
     * tenido que tener un token valido
    */
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(error);
  }
};

const isAuthAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return next(new Error('Unauthorized'));
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (req.user.rol !== 'admin') {
      return next(new Error('Unauthorized, not admin'));
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  isAuth,
  isAuthAdmin,
};