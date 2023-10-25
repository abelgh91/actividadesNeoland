//importamos las funciones que nos vayan haciendo falta
const Character = require("../Models/Character.models");


//Hacemos el CRUD (create, read, update, delete)
//1.create --> POST
//2.read --> GET
//3.update --> PUT Y PATCH
//4.delete --> DELETE

// req es lo que nos requiere el cliente, res es la respuesta, y next es para gestionar el error si lo hubiera.
//ahora vamos a coger la url de la imagen, porque como se sube antes de meternos en el controlador,
//si hay error en el controlador, la borramos de cloudinary antes.
const create = async (req, res, next) => {
    //req.file es porque es una imagen, la ? es un optional chaining que se pone porque no es obligatorio meter
    //imagen entonces puede que no la tengamos, y path es la ruta de la imagen
    let takeImage = req.file?.path;
    //actualizar indexes por si hay alguna actualizacion
    try {
        await Character.syncIndexes()
        //creamos una funcion para meterle la info que recibamos, o body o imagen.
        const newCharacter = new Character(req.body);
        console.log(newCharacter)
    } catch (error) {
        
    }
}

module.exports = {create};
