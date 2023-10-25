//importamos las funciones que nos vayan haciendo falta
const { deleteImgCloudinary } = require("../../middleware/files.middleware");
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
        //creamos una funcion para meterle la info que recibamos por req.body,podemos recibir body o imagen. Esta funcion crea un objeto
        //si recibimos la imagen tenemos que meter la url cogida en en takeImage en newCharacter, sino una img por defecto
        const newCharacter = new Character(req.body);
        
        if(req.file){
            newCharacter.image = takeImage;
        }else{
            newCharacter.image = "https://res.cloudinary.com/dqlvldxwc/image/upload/v1698243435/pngtree-character-default-avatar-image_2237203_yzet4n.jpg"
        }

        //guardamos el nuevo character en una constante y la devolvemos si esta todo ok (200) o not found(404)
        const saveNewCharacter = await newCharacter.save();

        if(saveNewCharacter){
            return res.status(200).json(saveNewCharacter);
        }else {
            return res.status(404).json("No se ha podido guardar el elemento en la Base de Datos❌⛔");
        }

    } catch (error) {
        //si hay error hay que borrar la img antes de entrar al controlador ya que es un middleware
        req.file?.path && deleteImgCloudinary(takeImage);
        next(error); // porque quiero saber cual es el error
        return (res.status(404).json({
            message: "Error al crear el elemento",
            error: error,
        })&& next(error)
        )
    }
};

//HACEMOS UN GET BY ID

const getById = async (req, res, next) => {
    try {
        //destructuring del id (porque nos lo han pedido por id, entonces lo buscamos) y luego guardamos
        // en una funcion el id que hemos encontrado
        const {id} = req.params;
        const characterById = await Character.findById(id)
        if(characterById){
            return res.status(200).json(characterById)
        }else{
            return res.status(404).json("No ha sido posible encontrar el character solicitado👎")
        }
    } catch (error) {
        return res.status(404).json(error.message)
    }
};


//HACEMOS UN GET ALL

const getAll = async (req, res, next) => {
    try {
        const allCharacters = await Character.find()
        if (allCharacters.length > 0){ // porque nos devuelve un array, entonces si es mayor que 0 es que si lo ha encontrado
            return res.status(200).json(allCharacters);
        }else {
            return res.status(404).json("No ha sido posible encontrar el character")
        }
    } catch (error) {
        return res.status(404).json({
            error: "error al buscar. Lo ha pillado el catch 👮‍♂️",
            message: error.message,
        });
    }
};

//HACEMOS UN GET BY NAME

const getByName = async (req, res, next) => {
    try {
        //destructuring del name, porque lo pide por name
        const {name} = req.params;
        const characterByName = await Character.find({name});
        if (characterByName.length > 0){
            return res.status(200).json(getByName);
        }else {
            return res.status(404).json("No se ha podido encontrar el character 👎")
        }
    } catch (error) {
        return res.status(404).json({
            error: "error al buscar por nombre. Ha sido pillado en el catch 👮‍♂️",
            message: error.message,
        });
    }
};


module.exports = {create, getById, getAll};
