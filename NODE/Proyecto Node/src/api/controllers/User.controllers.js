const { deleteImgCloudinary } = require('../../middleware/files.middleware');
const { setSendEmail, getSendEmail } = require('../../state/state.data');
const randomCode = require('../../utils/randomCode');
const sendEmail = require('../../utils/sendEmail');
const User = require('../models/User.model');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/token');
const setError = require('../../helpers/handle-error');
const randomPassword = require('../../utils/randomPassword');
const validator = require('validator');
const enumGenderOk = require('../../utils/enumOk');
const Parque = require('../models/Parque.model');
const Ave = require('../models/Ave.model');


//  ------------------REGISTER LARGO--------------------------

const register =async (req, res, next) => {
    let catchImg = req.file?.path;
    try {
        await User.syncIndexes();
        const confirmationCode = randomCode();
        const {name, email} = req.body;

        //comprobamos si el usuario existe
        const userExist = await User.findOne(
            { email: req.body.email },
            { name: req.body.name }
          );

          if(!userExist){
            const newUser = new User({...req.body, confirmationCode});
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
    await User.syncIndexes(); //actualizamos
    let confirmationCode = randomCode();
    const {name, email} = req.body; // del body nos quedamos con el email y el name y luego comparamos a ver si existe
    const userExist = await User.findOne(//buscamos si en User existe un email o un nombre igual
      {email : req.body.email},
      {name : req.body.name}
      );
      //si no existe, creamos el nuevo usuario con el req body+codigo de confirmacion, si tiene imagen la cogemos sino una por defecto
      if(!userExist){
        const newUser = new User({ ...req.body, confirmationCode });
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
        return res.status(409).json('this User already exist');
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
    await User.syncIndexes();
    let confirmationCode = randomCode();
    const userExist = await User.findOne(
      { email: req.body.email },
      { name: req.body.name }
    );
    if (!userExist) {
      const newUser = new User({ ...req.body, confirmationCode });
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
      return res.status(409).json('this User already exist');
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
    const userDB = await User.findById(id);

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
    const userDb = await User.findOne({ email });

    // vamos a hacer un if else para ver si existe o no

    if (userDb) {
      // tenemos que comparar la contraseña sin encriptar con la encriptada del backend
      // se hace con el metodo de bcrypt de compareSync
      // importante ponerle en ese orden las contraseñas, primero la del body y luego la q tenemos en el backend
      if (bcrypt.compareSync(password, userDb.password)) {
        /** si coincideen lo que hago el llamarme a la funcion de generar el token */
        const token = generateToken(userDb._id, email);
        /** una vez lo he generado le envio al User el token */
        return res.status(200).json({
          user: userDb,
          token,
        });
      } else {
        // si las contraseñas no son iguales le mandamos un 404 para decirle que nos ponga la contraseña correcta
        return res.status(404).json('password dont match');
      }
    } else {
      // si no existe le mando un User not register como que no esta registrado
      return res.status(404).json('User not register');
    }
  } catch (error) {
    return next(error);
  }
};

//--------------------EXAMPLE AUTENTICACION--------------

const exampleAuth = async (req,res,next)=>{
  // esto de aqui se crea gracias a que tiene un middleware de autenticacion que crea el req.User
  const {user}= req
  return res.status(200).json(user)
}


//---------------------AUTOLOGIN------------------

const autoLogin = async (req, res, next) => {
  try {
    //recibimos el email y la password por el req.body
    const { email, password } = req.body;
    //buscamos un usuario con ese email
    const userDb = await User.findOne({ email });

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
      // si no existe le mando un User not register
      return res.status(404).json('User not register');
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
    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) { // enviamos el codigo
      // hacemos las opciones del email
      const mailOptions = {
        from: email,
        to: req.body.email,
        subject: 'Confirmation code',
        text: `tu codigo es ${userExist.confirmationCode}`,
      };

      // el sendMail de nodemailer para enviar el codigo y las respuestas User
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

//------------------CHECK NEW User------------------------

const checkNewUser = async (req, res, next) => {
  try {
    // recibimos el email y el codigo de confirmacion por el req.body
    const { email, confirmationCode } = req.body;
    // comprobamos que este usuario exista
    const userExists = await User.findOne({ email });

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
          const updateUser = await User.findOne({ email });
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
        await User.findByIdAndDelete(userExists._id);
        // borramos su imagen
        deleteImgCloudinary(userExists.image);
        // lanzamos un 404 con el usuario que antes existia, el check en false y un test de si se ha borrado correctamente o no
        return res.status(404).json({
          userExists,
          check: false,
          delete: (await User.findById(userExists._id))
            ? 'error delete User'
            : 'ok delete User',
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
    const userDb = await User.findOne({ email });

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
    // recuperamos el id del param para buscar el User por id
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
        return res.status(404).json('dont send email and dont update User');
      } else {
        console.log('Email sent: ' + info.response);
        // en caso de que si haya enviado el correo, haseo la contraseña (hash es encryptar)
        const newPasswordBcrypt = bcrypt.hashSync(passwordSecure, 10);

        try {
          // despues de encryptar actualizo el User que busco por id la contraseña con la contraseña encryptada
          await User.findByIdAndUpdate(id, { password: newPasswordBcrypt });

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

//-------------GET BY ID-------------------

const getById = async (req, res, next) => {
  try {
      //destructuring del id (porque nos lo han pedido por id, entonces lo buscamos) y luego guardamos
      // en una funcion el id que hemos encontrado
      const {id} = req.params;
      const userById = await User.findById(id)
      if(userById){
          return res.status(200).json(userById)
      }else{
          return res.status(404).json("No ha sido posible encontrar el user solicitado👎")
      }
  } catch (error) {
      return res.status(404).json(error.message)
  }
};

//-----------------GET BY NAME----------------

const getByName = async (req, res, next) => {
  try {
      const {name} = req.params;
      const userByName = await User.find({name});
      if (userByName.length > 0){
          return res.status(200).json(userByName);
      }else {
          return res.status(404).json("No se ha podido encontrar el user 👎")
      }
  } catch (error) {
      return res.status(404).json({
          error: "error al buscar por nombre. Ha sido pillado en el catch 👮‍♂️",
          message: error.message,
      });
  }
};

//---------------GET ALL----------------

const getAll = async (req, res, next) => {
  try {
      const allUser = await User.find();
      if(allUser.length > 0) {
          return res.status(200).json(allUser);
      }else{
          return res.status(404).json("No ha sido posible encontrar el user")
      }
  } catch (error) {
      return res.status(404).json({
          error: "error al buscar. Lo ha pillado el catch 👮‍♂️",
          message: error.message,
      })
  }
};

//! --------------------------- CONTROLADORES CON AUTHENTICACION---------------------------


//? --------------------------------------------------------------------
//! ---------CAMBIO DE CONTRASEÑA CUANDO YA SE ESTA ESTA LOGADO---------
//? --------------------------------------------------------------------

const modifyPassword = async (req, res, next) => {
  try {
    // recibimos la contraseña antigua y la nueva
    const { password, newPassword } = req.body;

    //comprobamos si es strong o no la nueva
    const validado = validator.isStrongPassword(newPassword);
    if (validado) {
      // vamos a sacar el id del usuario autenticado y autorizado del req.User
      const { _id } = req.user;

      // vamos a ver si la contraseña antigua no encryptada, es igual a la contraseña antigua encryptada
       
      if (bcrypt.compareSync(password, req.user.password)) {
        // si coinciden hacemos el cambio y hasheamos la contraseña nueva
        const newPasswordHashed = bcrypt.hashSync(newPassword, 10);
        try {
          //actualizamos el User con la nueva password
          //! -----------> no hacerlo con el .save
          await User.findByIdAndUpdate(_id, { password: newPasswordHashed });

         //--------TEST

          /** vamos a sacar el usuario ya actualizado y vamos a comprobar que la nueva contraseña
           * sin encryptar y la contraseña encryptada actualizada coincidan
           * IMPORTANTE ----> SOLO CON EL METODO COMPARESYNC
           */
          const userUpdate = await User.findById(_id);
          if (bcrypt.compareSync(newPassword, userUpdate.password)) {
            //si esta todo ok ---> (200), usuario actualizado
            return res.status(200).json({
              updateUser: true,
            });
          } else {
            // si hay error --->(404), usuario no actualizado
            return res.status(404).json({
              updateUser: false,
            });
          }
        } catch (error) {
          return res.status(404).json({
            error: 'error catch update',
            message: error.message,
          });
        }
      } else {
        return res.status(404).json('password dont match');
      }
    } else {
      return res.status(404).json('password not valid');
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//! -----------------------------------------------------------------------------
//? ---------------------------------UPDATE--------------------------------------
//! -----------------------------------------------------------------------------

const update = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    // actualizamos
    await User.syncIndexes();
    // instanciamos un nuevo objeto del modelo de user con el req.body
    const patchUser = new User(req.body);
    // si tenemos imagen metemos a la instancia del modelo la img nueva
    req.file && (patchUser.image = catchImg);

    // vamos a guardar info que no quiero que el usuario pueda cambiarme 
    patchUser._id = req.user._id;
    patchUser.password = req.user.password;
    patchUser.rol = req.user.rol;
    patchUser.confirmationCode = req.user.confirmationCode;
    patchUser.email = req.user.email;
    patchUser.check = req.user.check;

    /** para el genero al ser un enum tenemos que comprobarlo para salvaguardar la info mediante una
     * funcion que comprueba si la que me envia esta dentro del enum o no
     */
    if (req.body?.gender) {
      // lo comprobamos y lo metermos en patchUser con un ternario en caso de que sea true o false el resultado de la funcion
      const resultEnumGender = enumGenderOk(req.body?.gender);
      patchUser.gender = resultEnumGender.check ? req.body?.gender : req.user.gender;
    }

    try {
      /** actualizamos ----->> NO HACER CON SAVE
       * le metemos en el primer valor el id del objeto a actualizar
       * y en el segundo valor le metemos la info nueva
       */
      await User.findByIdAndUpdate(req.user._id, patchUser);

      // si nos ha metido una imagen nueva y ya la hemos actualizado borramos la antigua
      // la antigua imagen la tenemos guardada con el usuario autenticado --> req.user
      if (req.file) deleteImgCloudinary(req.user.image);

      //todo ------ test runtime-------------------

      // lo primero cuando testeamos es el elemento actualizado para comparar la info que viene del req.body
      const updateUser = await User.findById(req.user._id);

      /** sacamos las claves del objeto del req.body para saber que info nos han pedido actualizar */
      const updateKeys = Object.keys(req.body);

      // creamos un array donde guardamos los test
      const testUpdate = [];

      // recorremos el array de la info que con el req.body nos dijeron de actualizar
      /** este array lo sacamos con el Object.keys */
      updateKeys.forEach((item) => {
        /** vamos a comprobar que la info actualizada sea igual que lo que me mando por el body */
        if (updateUser[item] === req.body[item]) {
          /** aparte vamos a comprobar que esta info sea diferente a lo que ya teniamos en mongo subido antes */
          if (updateUser[item] != req.user[item]) {
            // si es diferente a lo que ya teniamos lanzamos el nombre de la clave y su valor como true en un objeto
            // este objeto se pushea en el array que creamos arriba que guarda todos los testing en el runtime
            testUpdate.push({
              [item]: true,
            });
          } else {
            // si son igual lo que pusearemos sera el mismo objeto que arriba pero diciendo que la info es igual
            testUpdate.push({
              [item]: 'sameOldInfo',
            });
          }

          // si la info del body y la del usuario atualizado no son iguales pues le mandamos un objeto con la clave y su valor en false
        } else {
          testUpdate.push({
            [item]: false,
          });
        }
      });

      /// La imagen siempre aparte porque va porque va por la req.file
      if (req.file) {
        /** si la imagen del user actualizado es estrictamente igual a la imagen nueva que la
         * guardamos en el catchImg, mandamos un objeto con la clave image y su valor en true
         * en caso contrario mandamos esta clave con su valor en false
         */
        updateUser.image === catchImg
          ? testUpdate.push({
              image: true,
            })
          : testUpdate.push({
              image: false,
            });
      }
      /** una vez finalizado el testing en el runtime vamos a mandar el usuario actualizado y el objeto
       * con los test
       */
      return res.status(200).json({
        updateUser,
        testUpdate,
      });
    } catch (error) {
      // si hay un error en la actualizacion pues mandamos a borrar la imagen que finalmente no hemos actualizar
      req.file && deleteImgCloudinary(catchImg);
      return res.status(404).json({
        error: 'error catch update',
        message: error.message,
      });
    }
  } catch (error) {
    // si hay un error en la actualizacion pues mandamos a borrar la imagen que finalmente no hemos actualizar
    req.file && deleteImgCloudinary(catchImg);
    return next(
      setError(500, error.message || 'Error general to UPDATE with AUTH')
    );
  }
};

//--------------------DELETE--------------------

const deleteUser = async (req, res, next) => {
  try {
    //! importante no hacer destructuring para si me mandan borrar un user con un token no valido no rompa
    // hacemos el metodo con el id del req.user
    // el optional channing va a salvaguardar que no rompa en caso de no haber req.user
    await User.findByIdAndDelete(req.user?._id);
    // si ya hemos borrado el usuario borramos su imagen
    deleteImgCloudinary(req.user?.image);

    try {
      await Parque.updateMany(
        { likes: req.user?._id },
        { $pull: { likes: req.user?._id } }
      );
      await Parque.updateMany(
        {visitado: req.user?._id},
        {$pull: {visitado: req.user?._id}}
      )

        try {
          await Ave.updateMany(
            { likes: req.user?._id },
            { $pull: { likes: req.user?._id } }
          );
          await Ave.updateMany(
            {visto: req.user?._id},
            {$pull: {visto: req.user?._id}}
          )
          // buscamos el user por id para luego en la respuesta lanzar un 404 o un 200 en caso de que exista o que no exista
           const existUser = await User.findById(req.user?._id);
           return res.status(existUser ? 404 : 200).json({
           deleteTest: existUser ? false : true,
           });
        } catch (error) {
          return res.status(404).json({
            error: 'error catch delete Ave',
            message: error.message,
          });
          }

    } catch (error) {
      return res.status(404).json({
        error: 'error catch delete Parque',
        message: error.message,
      });
    }
  } catch (error) {
    return next(setError(500, error.message || 'Error general to DELETE'));
  }
};

//! -----------------------------------------------------------------------------
//? -------------------------------ADD FAV PARQUE--------------------------------
//! -----------------------------------------------------------------------------

const addFavParque = async (req, res, next) => {
  try {
    /** vamos a recibir el idParque por el param y hacemos destructuring del req.user porque esto es autenticado */
    const { idParque } = req.params;
    const { _id, parqueFav } = req.user;
    /** como es un toggle tenemos que comprobar que incluya o no el id del parque dentro de parqueFav que es un array del user autenticado */
    if (parqueFav.includes(idParque)) {
      ///-------------> PULL PARA SACAR EN EL ARRAY
      try {
        // actualizamos el usuario, primero la condicion (_id) y segundo la ejecucion {$pull ....}
        await User.findByIdAndUpdate(_id, {
          $pull: { parqueFav: idParque },
        });

        try {
          // actualizamos el parque igual sacando el id del user
          await Parque.findByIdAndUpdate(idParque, {
            $pull: { likes: _id },
          });

          //! -------------------- respuesta----------------------

          // la respuesta lanzamos los objetos actualizados para que veamos el valor actualizados de ambos
          return res.status(200).json({
            userUpdate: await User.findById(_id),
            parqueUpdate: await Parque.findById(idParque),
            action: `pull idParque ${idParque}`,
          });
        } catch (error) {
          return res.status(404).json({
            error: 'error catch update Parque pull',
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: 'error catch update User pull',
          message: error.message,
        });
      }

      // en caso de que no lo incluya lo que hacems es un push que es incluirlo en el array tanto para el user como para el parque
    } else {
      try {
        await User.findByIdAndUpdate(_id, {
          $push: { parqueFav: idParque },
        });
        try {
          await Parque.findByIdAndUpdate(idParque, {
            $push: { likes: _id },
          });

          //! ---------------------- respuesta -------------------------

          return res.status(200).json({
            userUpdate: await User.findById(_id),
            parqueUpdate: await Parque.findById(idParque),
            action: `push id Parque ${idParque}`,
          });
        } catch (error) {
          return res.status(404).json({
            error: 'error catch update Parque push',
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: 'error catch update User push',
          message: error.message,
        });
      }
      /// ------------> PUSH PARA METER EN EL ARRAY
    }

    // pensamos lo que tenemos que actualizar
    // ----> 1) Parque ----> array likes ---> necesitamos el id del parque ----> id del user lo sacamos del req.user
    // ----> 2) User  ----> array parqueFav -> necesitamos el id del parque ----> id del user lo sacamos del req.user
  } catch (error) {
    return next(setError(500, error.message || 'Error general to DELETE'));
  }
};


//! -----------------------------------------------------------------------------
//? -------------------------------ADD FAV AVE-----------------------------------
//! -----------------------------------------------------------------------------

const addFavAve = async (req, res, next) => {
  try {
    /** vamos a recibir el idaVE por el param y hacemos destructuring del req.user porque esto es autenticado */
    const { idAve } = req.params;
    const { _id, aveFav } = req.user;
    /** como es un toggle tenemos que comprobar que incluya o no el id del ave dentro de aveFav que es un array del user autenticado */
    if (aveFav.includes(idAve)) {
      ///-------------> PULL PARA SACAR EN EL ARRAY
      try {
        // actualizamos el usuario, primero la condicion (_id) y segundo la ejecucion {$pull ....}
        await User.findByIdAndUpdate(_id, {
          $pull: { aveFav: idAve },
        });

        try {
          // actualizamos el ave igual sacando el id del user
          await Ave.findByIdAndUpdate(idAve, {
            $pull: { likes: _id },
          });

          //! -------------------- respuesta----------------------

          // la respuesta lanzamos los objetos actualizados para que veamos el valor actualizados de ambos
          return res.status(200).json({
            userUpdate: await User.findById(_id),
            aveUpdate: await Ave.findById(idAve),
            action: `pull idAve ${idAve}`,
          });
        } catch (error) {
          return res.status(404).json({
            error: 'error catch update Ave pull',
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: 'error catch update User pull',
          message: error.message,
        });
      }

      // en caso de que no lo incluya lo que hacemos es un push que es incluirlo en el array tanto para el user como para el ave
    } else {
      try {
        await User.findByIdAndUpdate(_id, {
          $push: { aveFav: idAve },
        });
        try {
          await Ave.findByIdAndUpdate(idAve, {
            $push: { likes: _id },
          });

          //! ---------------------- respuesta -------------------------

          return res.status(200).json({
            userUpdate: await User.findById(_id),
            aveUpdate: await Ave.findById(idAve),
            action: `push id Ave ${idAve}`,
          });
        } catch (error) {
          return res.status(404).json({
            error: 'error catch update Ave push',
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: 'error catch update User push',
          message: error.message,
        });
      }
      /// ------------> PUSH PARA METER EN EL ARRAY
    }

    // pensamos lo que tenemos que actualizar
    // ----> 1) Ave ----> array likes ---> necesitamos el id del ave ----> id del user lo sacamos del req.user
    // ----> 2) User  ----> array aveFav -> necesitamos el id del ave ----> id del user lo sacamos del req.user
  } catch (error) {
    return next(setError(500, error.message || 'Error general to DELETE'));
  }
};

//---------------------ADD PARQUE VISITADO---------------------------

const addParqueVisitado = async (req, res, next) => {
  try {
    /** vamos a recibir el idParque por el param y hacemos destructuring del req.user porque esto es autenticado */
    const { idParque } = req.params;
    const { _id, parqueVisitado } = req.user;
    /** como es un toggle tenemos que comprobar que incluya o no el id del parque dentro de parqueVisitado que es un array del user autenticado */
    if (parqueVisitado.includes(idParque)) {
      ///-------------> PULL PARA SACAR EN EL ARRAY
      try {
        // actualizamos el usuario, primero la condicion (_id) y segundo la ejecucion {$pull ....}
        await User.findByIdAndUpdate(_id, {
          $pull: { parqueVisitado: idParque },
        });

        try {
          // actualizamos el parque igual sacando el id del user
          await Parque.findByIdAndUpdate(idParque, {
            $pull: { visitado: _id },
          });

          //! -------------------- respuesta----------------------

          // la respuesta lanzamos los objetos actualizados para que veamos el valor actualizados de ambos
          return res.status(200).json({
            userUpdate: await User.findById(_id),
            parqueUpdate: await Parque.findById(idParque),
            action: `pull idParque ${idParque}`,
          });
        } catch (error) {
          return res.status(404).json({
            error: 'error catch update Parque pull',
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: 'error catch update User pull',
          message: error.message,
        });
      }

      // en caso de que no lo incluya lo que hacemos es un push que es incluirlo en el array tanto para el user como para el parque
    } else {
      try {
        await User.findByIdAndUpdate(_id, {
          $push: { parqueVisitado: idParque },
        });
        try {
          await Parque.findByIdAndUpdate(idParque, {
            $push: { visitado: _id },
          });

          //! ---------------------- respuesta -------------------------

          return res.status(200).json({
            userUpdate: await User.findById(_id),
            parqueUpdate: await Parque.findById(idParque),
            action: `push id Parque ${idParque}`,
          });
        } catch (error) {
          return res.status(404).json({
            error: 'error catch update Parque push',
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: 'error catch update User push',
          message: error.message,
        });
      }
      /// ------------> PUSH PARA METER EN EL ARRAY
    }

    // pensamos lo que tenemos que actualizar
    // ----> 1) Parque ----> array visitado ---> necesitamos el id del parque ----> id del user lo sacamos del req.user
    // ----> 2) User  ----> array parqueVisitado -> necesitamos el id del parque ----> id del user lo sacamos del req.user
  } catch (error) {
    return next(setError(500, error.message || 'Error general to DELETE'));
  }
};

//--------------------------ADD AVE VISTA-------------------------

const addAveVista = async (req, res, next) => {
  try {
    /** vamos a recibir el idaVE por el param y hacemos destructuring del req.user porque esto es autenticado */
    const { idAve } = req.params;
    const { _id, aveVistas } = req.user;
    /** como es un toggle tenemos que comprobar que incluya o no el id del ave dentro de aveFav que es un array del user autenticado */
    if (aveVistas.includes(idAve)) {
      ///-------------> PULL PARA SACAR EN EL ARRAY
      try {
        // actualizamos el usuario, primero la condicion (_id) y segundo la ejecucion {$pull ....}
        await User.findByIdAndUpdate(_id, {
          $pull: { aveVistas: idAve },
        });

        try {
          // actualizamos el ave igual sacando el id del user
          await Ave.findByIdAndUpdate(idAve, {
            $pull: { visto: _id },
          });

          //! -------------------- respuesta----------------------

          // la respuesta lanzamos los objetos actualizados para que veamos el valor actualizados de ambos
          return res.status(200).json({
            userUpdate: await User.findById(_id),
            aveUpdate: await Ave.findById(idAve),
            action: `pull idAve ${idAve}`,
          });
        } catch (error) {
          return res.status(404).json({
            error: 'error catch update Ave pull',
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: 'error catch update User pull',
          message: error.message,
        });
      }

      // en caso de que no lo incluya lo que hacemos es un push que es incluirlo en el array tanto para el user como para el ave
    } else {
      try {
        await User.findByIdAndUpdate(_id, {
          $push: { aveVistas: idAve },
        });
        try {
          await Ave.findByIdAndUpdate(idAve, {
            $push: { visto: _id },
          });

          //! ---------------------- respuesta -------------------------

          return res.status(200).json({
            userUpdate: await User.findById(_id),
            aveUpdate: await Ave.findById(idAve),
            action: `push id Ave ${idAve}`,
          });
        } catch (error) {
          return res.status(404).json({
            error: 'error catch update Ave push',
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: 'error catch update User push',
          message: error.message,
        });
      }
      /// ------------> PUSH PARA METER EN EL ARRAY
    }

    // pensamos lo que tenemos que actualizar
    // ----> 1) Ave ----> array visto ---> necesitamos el id del ave ----> id del user lo sacamos del req.user
    // ----> 2) User  ----> array aveVistas -> necesitamos el id del ave ----> id del user lo sacamos del req.user
  } catch (error) {
    return next(setError(500, error.message || 'Error general to DELETE'));
  }
};

//--------------------GET VER LIKES PARQUES------------------- // ESTO DA EL OBJETO COMPLETO DEL USUARIO LOGADO CON LA INFO DE LOS PARQUES COMPLETA

const getLikesParque = async (req, res, next) => {
  try {
      const {_id} = req.user
      const userById = await User.findById(_id)
      .populate("parqueFav")
      if(userById){
        return res.status(200).json(userById)
      }else{
        return res.status(404).json("No es posible popular el parqueFav")
      }
      
  } catch (error) {
      return res.status(404).json(error.message)
  }
};

//-----------------GET VER LIKES AVES -------------------

const getLikesAves = async (req, res, next) => {
  try {
      const {_id} = req.user
      const userById = await User.findById(_id)
      .populate("aveFav")
      if(userById){
        return res.status(200).json(userById)
      }else{
        return res.status(404).json("No es posible popular el aveFav")
      }
  } catch (error) {
      return res.status(404).json(error.message)
  }
};

//--------------FOLLOWERS --------------- 

const follow = async (req, res, next) => {
  try {
    const { id } = req.params //ESTE ID ES DE LA PERSONA QUE QUEREMOS VER SI SEGUIMOS O NO
    const {_id, followed } = req.user //ESTE ES EL USUARIO LOGADO
    if(followed.includes(id)){ // SI EN FOLLOWED APARECE LA PERSONA QUE HEMOS BUSCADO, LA SACAMOAS, SINO LA METEMOS
      try {
        await User.findByIdAndUpdate(_id, {  //SE ACTUALIZA EL USUARIO LOGADO
          $pull: { followed: id },
        });
        try {
          await User.findByIdAndUpdate(id, { // Y SACAMOS AL USUARIO LOGADO DE LA PARTE DE FOLLOWERS DE LA PERSONA QUE HEMOS BUSCADO
            $pull: { followers: _id },
          });
          return res.status(200).json({
            userFollowed: await User.findById(id).populate('followed'),
            userFollow: await User.findById(_id).populate('followers'),
            action: `pull id ${id}`,
          });
        } catch (error) {
          return res.status(404).json({
            error: 'error catch update followers pull',
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: 'error catch update followed pull',
          message: error.message,
        });
      }
    }else{
      try {
        await User.findByIdAndUpdate(_id, {
          $push: { followed: id },
        });
        try {
          await User.findByIdAndUpdate(id, {
            $push: { followers: _id },
          });
          return res.status(200).json({
            userFollowed: await User.findById(id), 
            userFollow: await User.findById(_id),  
            action: `push id ${id}`,
          });
        } catch (error) {
          return res.status(404).json({
            error: 'error catch update followers push',
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: 'error catch update followers push',
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json({
      error: 'error catch update followers push',
      message: error.message,
    });
  }
};

//----------------SORT NUMERO DE FOLLOWERS------------- 

const sortFollowers = async (req, res, next) => {
  try {
    const allUsers = await User.find()
    if(allUsers.length > 0){
      allUsers.sort((a, b) => b.followers - a.followers)
      return res.status(200).json(allUsers)
    }else{
      return res.status(404).json('error al ordenar por followers')
    }
  } catch (error) {
    return next(setError(500, error,messsage || 'Error to find'))
  }
}

module.exports = { 
  register, 
  registerEstado, 
  registerWithRedirect, 
  sendCode, 
  login, 
  exampleAuth, 
  autoLogin, 
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
};