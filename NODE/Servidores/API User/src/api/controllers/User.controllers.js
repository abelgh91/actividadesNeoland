const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const randomCode = require("../../utils/randomCode");
const user = require("../models/User.model");
const nodemailer = require("nodemailer")


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
                    const emailEnv = process.env.MAIL
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

module.exports = register;