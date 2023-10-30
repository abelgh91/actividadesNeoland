const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const { setSendEmail, getSendEmail } = require("../../state/state.data");
const randomCode = require("../../utils/randomCode");
const sendEmail = require("../../utils/sendEmail");
const user = require("../models/User.model");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/token");


//  ------------------REGISTER LARGO--------------------------

const register =async (req, res, next) => {
    let catchImg = req.file?.path;
    try {
        await user.syncIndexes();
        const confirmationCode = randomCode();
        const {name, email} = req.body;

        //comprobamos si el usuario existe
        const userExist = await user.findOne(
            { email: req.body.email },
            { name: req.body.name }
          );

          if(!userExist){
            const newUser = new user({...req.body, confirmationCode});
            if (req.file) {
                newUser.image = req.file.path;
              } else {
                newUser.image = 'https://pic.onlinewebfonts.com/svg/img_181369.png';
              }
              try {
                const savedUser = await newUser.save();
                if(savedUser){
                    const emailEnv = process.env.EMAIL
                    const password = process.env.PASSWORD;

          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: emailEnv,
              pass: password,
            },
          });

          const mailOptions = {
            from: emailEnv,
            to: email,
            subject: 'Confirmation code',
            text: `tu codigo es ${confirmationCode}, gracias por confiar en nosotros ${name}`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              return res.status(404).json({
                user: savedUser,
                confirmationCode: 'error, resend code',
              });
            } else {
              console.log('Email sent: ' + info.response);
              return res.status(200).json({
                user: savedUser,
                confirmationCode,
              });
            }
          });
        };     
              } catch (error) {
                req.file && deleteImgCloudinary(catchImg);
        return res.status(404).json({
          error: 'error catch save',
          message: error.message,
        });
              }
          }else{
            req.file && deleteImgCloudinary(catchImg) //si el usuario ya existe tenemos que borrar la img q haya puesto porque el registro no se hace efectivo
            return res.status(404).json("Este usuario ya existe")
          }
    } catch (error) {
        req.file && deleteImgCloudinary(catchImg);
            return (res.status(404).json({
                error:"error en el catch 👮‍♂️",
                message: error.message,
            }) && next(error)
            );
    }
};

// -------------REGISTER CON EL ESTADO --------------------

const registerEstado = async (req, res, next) => {
  let catchImg = req.files?.path;
  try {
    await user.syncIndexes(); //actualizamos
    let confirmationCode = randomCode();
    const {name, email} = req.body; // del body nos quedamos con el email y el name y luego comparamos a ver si existe
    const userExist = await user.findOne(//buscamos si en user existe un email o un nombre igual
      {email : req.body.email},
      {name : req.body.name}
      );
      //si no existe, creamos el nuevo usuario con el req body+codigo de confirmacion, si tiene imagen la cogemos sino una por defecto
      if(!userExist){
        const newUser = new user({ ...req.body, confirmationCode });
      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image = 'https://pic.onlinewebfonts.com/svg/img_181369.png';
      }
      try {
        //guardamos el nuevo usuario
        const userSave = await newUser.save();

        if(userSave){
          // enviamos el correo con la funcion que se encuentra en utils y le metemos el email y el name que obtenemos del destructuring de req.body
          sendEmail(email, name, confirmationCode )

          setTimeout( ()=>{
            if(getSendEmail()){
            setSendEmail(false)
            res.status(200).json({
                user: userSave,
                confirmationCode,
              })
          }else{
            setSendEmail(false)
              return res.status(404).json({
                user: userSave,
                confirmationCode: 'error, resend code',
              });
          }
          }, 1400 )
        }
        
      } catch (error) {
        req.file && deleteImgCloudinary(catchImg);
        return res.status(404).json({
          error: 'error catch save',
          message: error.message,
        });  
      }

    }else{
        if (req.file) deleteImgCloudinary(catchImg);
        return res.status(409).json('this user already exist');
    }
  } catch (error) {
    req.file && deleteImgCloudinary(catchImg);
    return (
      res.status(404).json({
        error: 'error catch general',
        message: error.message,
      }) && next(error)
    );
  }
}


//------------------REGISTER CON REDIRECT -----------------

const registerWithRedirect = async (req, res, next) => {
  let catchImg = req.file?.path;

  try {
    await user.syncIndexes();
    let confirmationCode = randomCode();
    const userExist = await user.findOne(
      { email: req.body.email },
      { name: req.body.name }
    );
    if (!userExist) {
      const newUser = new user({ ...req.body, confirmationCode });
      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image = 'https://pic.onlinewebfonts.com/svg/img_181369.png';
      }

      try {
        const userSave = await newUser.save();
          //esta es la unica diferencia con respecto al de antes, ponemos un 307 porque no cambia de metodo
        if (userSave) {
          return res.redirect(
            307,
            `http://localhost:8080/api/v1/users/register/sendMail/${userSave._id}`
          );
        }
      } catch (error) {
        req.file && deleteImgCloudinary(catchImg);
        return res.status(404).json({
          error: 'error catch save',
          message: error.message,
        }); 
        
      }
    } else {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json('this user already exist');
    }
  } catch (error) {
    req.file && deleteImgCloudinary(catchImg);
    return (
      res.status(404).json({
        error: 'error catch general',
        message: error.message,
      }) && next(error)
    );
    
  }
};


// -------------------SEND CODE CONFIRMATION---------------------

const sendCode = async (req, res, next) => {
  try {

    // buscamos al usuario por ID que lo recibimos por req.params
    // para buscar su correo y su codigo de confirmacion

    const { id } = req.params;
    const userDB = await user.findById(id);

    const emailEnv = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailEnv,
        pass: password,
      },
    });

    const mailOptions = {
      from: emailEnv,
      to: userDB.email,
      subject: 'Confirmation code',
      text: `tu codigo es ${userDB.confirmationCode}, gracias por confiar en nosotros ${userDB.name}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(404).json({
          user: userDB,
          confirmationCode: 'error, resend code',
        });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({
          user: userDB,
          confirmationCode: userDB.confirmationCode,
        });
      }
    });
  } catch (error) {
    return (
      res.status(404).json({
        error: 'error catch general',
        message: error.message,
      }) && next(error)
    );
  }
};


//----------------LOGIN----------------

const login = async (req, res, next) => {
  try {
    //recibimos por el body el email y la password
    const { email, password } = req.body;
    // vamos a buscar un usuario con ese email
    const userDb = await user.findOne({ email });

    // vamos a hacer un if else para ver si existe o no

    if (userDb) {
      // tenemos que comparar la contraseña sin encriptar con la encriptada del backend
      // se hace con el metodo de bcrypt de compareSync
      // importante ponerle en ese orden las contraseñas, primero la del body y luego la q tenemos en el backend
      if (bcrypt.compareSync(password, userDb.password)) {
        /** si coincideen lo que hago el llamarme a la funcion de generar el token */
        const token = generateToken(userDb._id, email);
        /** una vez lo he generado le envio al user el token */
        return res.status(200).json({
          user: userDb,
          token,
        });
      } else {
        // si las contraseñas no son iguales le mandamos un 404 para decirle que nos ponga la contraseña correcta
        return res.status(404).json('password dont match');
      }
    } else {
      // si no existe le mando un user not register como que no esta registrado
      return res.status(404).json('user not register');
    }
  } catch (error) {
    return next(error);
  }
};

//--------------------EXAMPLE AUTENTICACION--------------

const exampleAuth = async (req,res,next)=>{
  // esto de aqui se crea gracias a que tiene un middleware de autenticacion que crea el req.user
  const {user}= req
  return res.status(200).json(user)
}

module.exports = { register, registerEstado, registerWithRedirect, sendCode, login, exampleAuth };
