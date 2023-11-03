const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/** generateToken recibe el id y el email del usuario
 * y se utiliza en el login */
const generateToken = (id, email) => {

    // si no tienes email o id te vamos a mandar un error diciendo que se te ha olvidado
  if (!id || !email) {
    throw new Error('Email or id are missing');
  }
  /// ------> si todo lo hemos recibido bien vamos a registrar la peticion de token con el metodo sign
  // necesitamos (la info para generar el token que es el id y el email, la palabra secreta del .env y su expiracion del token (cuando caduca))
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

/** ahora vamos hacer una decodificacion del token para sacar si este token sigue siendo valido y sacar la info 
 * que nos permitio generarlo (email y id)
 */
const verifyToken = (token) => {
    // si no tienes token----> lanzamos un error
  if (!token) throw new Error('Token is missing');
    // si tienes token directamente la funcion nos devuelve la decodificacion con su email y id
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};