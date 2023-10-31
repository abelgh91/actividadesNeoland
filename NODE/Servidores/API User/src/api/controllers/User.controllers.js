const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const { setSendEmail, getSendEmail } = require("../../state/state.data");
const randomCode = require("../../utils/randomCode");
const sendEmail = require("../../utils/sendEmail");
const user = require("../models/User.model");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/token");
const setError = require("../../helpers/handle-error");
const randomPassword = require("../../utils/randomPassword");


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


//---------------------AUTOLOGIN------------------

const autoLogin = async (req, res, next) => {
  try {
    //recibimos el email y la password por el req.body
    const { email, password } = req.body;
    //buscamos un usuario con ese email
    const userDb = await user.findOne({ email });

    // vamos a ver si existe o no ese usuario
    if (userDb) {
      /** la diferencia con el login es que en este caso lo que comparamos son dos contraseñas encriptadas por lo que
       * se pueden comparar directamente
       */
      if (password === userDb.password) {
        /** si coincideen llamamos a la funcion que genera el token */
        const token = generateToken(userDb._id, email);
        // enviamos el token
        return res.status(200).json({
          user: userDb,
          token,
        });
      } else {
        // si las contraseñas no son iguales le mandamos un 404
        return res.status(404).json('password dont match');
      }
    } else {
      // si no existe le mando un user not register
      return res.status(404).json('user not register');
    }
  } catch (error) {
    return next(error);
  }
};


//----------------------RESEND CODE-------------------

const resendCode = async (req, res, next) => {
  try {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    // en el transporter es donde tenemos todos los metodos necesarios para interactuar con el nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
    });
    // comprobar que el usuario existe 
    const userExist = await user.findOne({ email: req.body.email });

    if (userExist) { // enviamos el codigo
      // hacemos las opciones del email
      const mailOptions = {
        from: email,
        to: req.body.email,
        subject: 'Confirmation code',
        text: `tu codigo es ${userExist.confirmationCode}`,
      };

      // el sendMail de nodemailer para enviar el codigo y las respuestas user
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(404).json({
            resend: false,
          });
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({
            resend: true,
          });
        }
      });
    } else {
      // si no existe le mandamos un 404 diciendo que no esta registrado
      return res.status(404).json('User not found');
    }
  } catch (error) {
    return next(
      setError(500, error.message || 'Error general to sendResendCode')
    );
  }
};

//------------------CHECK NEW USER------------------------

const checkNewUser = async (req, res, next) => {
  try {
    // recibimos el email y el codigo de confirmacion por el req.body
    const { email, confirmationCode } = req.body;
    // comprobamos que este usuario exista
    const userExists = await user.findOne({ email });

    // si no existe le mandamos un 404 not found
    if (!userExists) {
      return res.status(404).json('User not found');
    } else {
      // si existe comparamos el codigo de confirmacion del back y el que nos envia por el req.body
      if (userExists.confirmationCode === confirmationCode) {
        try {
          // si coinciden actualizamos la clave check a true
          await userExists.updateOne({ check: true });

          // vamos a hacer actualizar buscando de nuevo el usuario actualizado para mandar el 200 y hacer un test
          const updateUser = await user.findOne({ email });
          return res.status(200).json({
            testCheckUser: updateUser.check == true ? true : false,
          });
        } catch (error) {
          return res.status(404).json({
            error: 'error catch update',
            message: error.message,
          });
        }
      } else {
        // si no coincide la password lo borramos del back
        await user.findByIdAndDelete(userExists._id);
        // borramos su imagen
        deleteImgCloudinary(userExists.image);
        // lanzamos un 404 con el usuario que antes existia, el check en false y un test de si se ha borrado correctamente o no
        return res.status(404).json({
          userExists,
          check: false,
          delete: (await user.findById(userExists._id))
            ? 'error delete user'
            : 'ok delete user',
        });
      }
    }
  } catch (error) {
    return next(setError(500, error.message || 'Error general to checkCode'));
  }
};

//--------------------CAMBIAR PASSWORD CUANDO AUN NO ESTAS LOGADO (SE TE OLVIDO LA CONTRASEÑA)

const changePassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    // hay que buscar el usuario que exista en el back y se hace con el email que recibimos por el body
    const userDb = await user.findOne({ email });

    // si este usuario existe, me llamo a un redirect que genera la contraseña y la envia
    if (userDb) {
      //! importante 307 ! -----> y importante que recibe como param el id del usuario
      return res.redirect(
        307,
        `http://localhost:8080/api/v1/users/sendPassword/${userDb._id}`
      );
    } else {
      // si no existe le digo que este usuario no esta registrado
      return res.status(404).json('User no register');
    }
  } catch (error) {
    return next(
      setError(500, error.message || 'Error general to changePassword NO AUTH')
    );
  }
};

//? REDIRECT ---------------------------SENDPASSWORD

const sendPassword = async (req, res, next) => {
  try {
    // recuperamos el id del param para buscar el user por id
    const { id } = req.params;
    const userDb = await User.findById(id);

    // vamos a generar la contraseña nueva mediante un util
    const passwordSecure = randomPassword();

    //! --------> ENVIO DE LA CONTRASEÑA--------
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
    });

    const mailOptions = {
      from: email,
      to: userDb.email,
      subject: '-----', // no ponemos la palabra password porque gmail la elimina directamente
      text: `User: ${userDb.name}. Your new code login is ${passwordSecure} Hemos enviado esto porque tenemos una solicitud de cambio de contraseña, si no has sido tú ponte en contacto con nosotros, gracias.`,
    };
    //!-------------------------------------------------------------
    //!-------------------------------------------------------------
    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);

        // En caso de que haya un error en el envio- le decimos un 404 - ni te he actualizado la password ni te he enviado el correo
        return res.status(404).json('dont send email and dont update user');
      } else {
        console.log('Email sent: ' + info.response);
        // en caso de que si haya enviado el correo, haseo la contraseña (hash es encryptar)
        const newPasswordBcrypt = bcrypt.hashSync(passwordSecure, 10);

        try {
          // despues de encryptar actualizo el user que busco por id la contraseña con la contraseña encryptada
          await user.findByIdAndUpdate(id, { password: newPasswordBcrypt });

          //todo-------------TEST PARA VER SI SE HA ACTUALIZADO CORRECTAMENTE
          const userUpdatePassword = await User.findById(id);

          //me compruebo si la contraseña generada sin encryptar es igual a la contraseña encryptada del back
          // y lo hago cn el compareSync
          if (bcrypt.compareSync(passwordSecure, userUpdatePassword.password)) {
            // si son iguales directamente meto un 200
            return res.status(200).json({
              updateUser: true,
              sendPassword: true,
            });
          } else {
            // si no son iguales le digo te he enviado el correo pero no te he actualizado tu usuario
            return res.status(404).json({
              updateUser: false,
              sendPassword: true,
            });
          }
        } catch (error) {
          return res.status(404).json({
            error: 'error catch update',
            message: error.message,
          });
        }
      }
    });
  } catch (error) {
    return next(
      setError(500, error.message || 'Error general to sendPassword NO AUTH')
    );
  }
};

module.exports = { register, registerEstado, registerWithRedirect, sendCode, login, exampleAuth, autoLogin, resendCode, checkNewUser, changePassword, sendPassword };