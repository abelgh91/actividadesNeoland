const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Ave = require("../models/Ave.model");
const Parque = require("../models/Parque.model");
const User = require("../models/User.model");

//-----------------CREAR---------------------

const crearAve = async (req, res, next) => {

    let takeImage = req.file?.path;
    //actualizar
    try {
        await Ave.syncIndexes()
        //creamos una funcion para meterle la info que recibamos por req.body. Esta funcion crea un objeto
        //si recibimos la imagen tenemos que meter la url cogida en takeImage en newAve, sino una img por defecto
        const newAve = new Ave(req.body);
        
        if(req.file){
            newAve.image = takeImage;
        }else{
            newAve.image = "https://res.cloudinary.com/dqlvldxwc/image/upload/v1699088512/ave_qbb76p.png"
        }
        //guardamos el nuevo ave en una constante y la devolvemos si esta todo ok (200) o not found(404)
        const saveNewAve = await newAve.save();

        if(saveNewAve){
            return res.status(200).json(saveNewAve);
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

//--------------GET BY ID---------------

const getById = async (req, res, next) => {
    try {
        //destructuring del id (porque nos lo han pedido por id, entonces lo buscamos) y luego guardamos
        // en una funcion el id que hemos encontrado
        const {id} = req.params;
        const aveById = await Ave.findById(id)
        if(aveById){
            return res.status(200).json(aveById)
        }else{
            return res.status(404).json("No ha sido posible encontrar el ave solicitado👎")
        }
    } catch (error) {
        return res.status(404).json(error.message)
    }
};

//-----------GET BY NAME----------------

const getByName = async (req, res, next) => {
    try {
        const {name} = req.params;
        const aveByName = await Ave.find({name});
        if (aveByName.length > 0){
            return res.status(200).json(aveByName);
        }else {
            return res.status(404).json("No se ha podido encontrar el ave 👎")
        }
    } catch (error) {
        return res.status(404).json({
            error: "error al buscar por nombre. Ha sido pillado en el catch 👮‍♂️",
            message: error.message,
        });
    }
};

//----------------GET ALL-----------------

const getAll = async (req, res, next) => {
    try {
        const allAve = await Ave.find();
        if(allAve.length > 0) {
            return res.status(200).json(allAve);
        }else{
            return res.status(404).json("No ha sido posible encontrar el ave")
        }
    } catch (error) {
        return res.status(404).json({
            error: "error al buscar. Lo ha pillado el catch 👮‍♂️",
            message: error.message,
        })
    }
};

//--------------UPDATE-----------

const update = async (req, res, next) => {
    //actualizamos 
    await Ave.syncIndexes();
    let takeImage = req.file?.path;
    try {
        const {id} = req.params;
        const aveById = await Ave.findById(id);
        if (aveById){
            const imgAntigua = aveById.image;

            // creamos el cuerpo del cliente, le decimos que si trae algo nuevo se quede con lo nuevo, sino con lo antiguo
            const bodyCliente = {
                _id: aveById._id,
                image: req.file?.path ? takeImage : imgAntigua,
                name: req.body?.name ? req.body?.name : aveById.name,
            };
            try {
                await Ave.findByIdAndUpdate(id, bodyCliente);
                if(req.file?.path){
                    deleteImgCloudinary(imgAntigua);
                }

            //testeamos en tiempo real que esto esté funcionando
            const elementoActualizadoById = await Ave.findById(id);
            const elementoActualizado = Object.keys(req.body); // sacamos las claves para ver qué nos ha dicho que actualicemos
            let test = {};
            elementoActualizado.forEach((item)=>{
                if(req.body[item] === elementoActualizadoById[item]){
                    test[item] = true
                }else {
                    test[item] = false
                }
            });
            if(takeImage){
                elementoActualizadoById.image === takeImage ? (test = {...test, file: true}) : (test = {...test, file: false}); 
            };

            //hacemos un contador y recorremos con for in porque es un objeto

            let acc = 0;
            for(clave in test){
                test[clave] == false && acc++;
            }
            if(acc > 0){
                return res.status(404).json({
                    dataTest: test,
                    update: false,
                });
            }else{
                return res.status(200).json({
                    dataTest: test,
                    update: true,
                });
            }

            } catch (error) {}
        }else{
            return res.status(404).json("Este ave no existe 👎")
        }
    } catch (error) {
        return res.status(404).json(error);
    }
};

//--------------DELETE----------------

const deleteAve = async (req, res, next) => {
    try {
      //! importante no hacer destructuring para si me mandan borrar un user con un token no valido no rompa
      // hacemos el metodo con el id del req.user
      // el optional channing va a salvaguardar que no rompa en caso de no haber req.user
      await Ave.findByIdAndDelete(req.user?._id);
      // si ya hemos borrado el usuario borramos su imagen
      deleteImgCloudinary(req.user?.image);
  
      try {
        await User.updateMany(
          { aveFav: req.user?._id },
          { $pull: { aveFav: req.user?._id } }
        );
          try {
            await Parque.updateMany(
              { aves: req.user?._id },
              { $pull: { aves: req.user?._id } }
            );
            // buscamos el user por id para luego en la respuesta lanzar un 404 o un 200 en caso de que exista o que no exista
             const existAve = await Ave.findById(req.user?._id);
             return res.status(existAve ? 404 : 200).json({
             deleteTest: existAve ? false : true,
             });
          } catch (error) {
            return res.status(404).json({
              error: 'error catch delete parque',
              message: error.message,
            });
            }
  
      } catch (error) {
        return res.status(404).json({
          error: 'error catch delete User',
          message: error.message,
        });
      }
    } catch (error) {
      return next(setError(500, error.message || 'Error general to DELETE'));
    }
  };

module.exports = {
    crearAve, 
    getAll, 
    getById, 
    getByName, 
    update,
    deleteAve
}