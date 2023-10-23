const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv")

dotenv.config();

//------------TRAER VARIABLE DE ENTORNO

const PORT = process.env.PORT

//---------CONFIGURAR SERVIDOR

const server = express();

//---------CONFIGURAMOS ROUTER PARA NODEMAILER

const router = express.Router();

router.get("/sendNewMail", (req, res, next)=>{
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: email,
            pass: password,
        }
    });

    const mailOptions = {
        from: email,
        to: "agarciaheredia91@gmail.com",
        subject: "confirmacion",
        text: "todo bien"
    }

    transport.sendMail(mailOptions, function(error, info) {
        if(error){
            return next(error)
        }else return res.status(200).json(`Email sent: ${info.response}`)
    })
})

server.use("/", router)

//-----------ESCUCHAR EL PUERTO

server.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})