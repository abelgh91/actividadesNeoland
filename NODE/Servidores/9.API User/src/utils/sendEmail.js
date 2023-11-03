const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');
const { setSendEmail } = require('../state/state.data');

const sendEmail = async (userEmail, name, confirmationCode) => {
    //resetear el estado a false porque aun no se ha enviado el correo
    setSendEmail(false);
  
    // nos traemos las variables de entorno para poder logarnos en gmail
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
  
    // creamos transporter que es quien tiene el metodo que hace el envio
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
    });
  
    const mailOptions = {
      from: email,
      to: userEmail,
      subject: 'Confirmation code',
      text: `tu codigo es ${confirmationCode}, gracias por confiar en nosotros ${name}`,
    };
  
    // hacer el envio del email
     transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        setSendEmail(false);
      } else {
        console.log('Email send: ' + info.response);
        setSendEmail(true);
      }
    })
  };
  
  module.exports = sendEmail;