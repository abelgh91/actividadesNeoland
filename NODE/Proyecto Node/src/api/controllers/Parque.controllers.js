const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Parque = require("../models/Parque.model");


//-----------------CREAR---------------------

const crearParque = async (req, res, next) => {

    let takeImage = req.file?.path;
    //actualizar
    try {
        await Parque.syncIndexes()
        //creamos una funcion para meterle la info que recibamos por req.body. Esta funcion crea un objeto
        //si recibimos la imagen tenemos que meter la url cogida en takeImage en newParque, sino una img por defecto
        const newParque = new Parque(req.body);
        
        if(req.file){
            newParque.image = takeImage;
        }else{
            newParque.image = "https://res.cloudinary.com/dqlvldxwc/image/upload/v1699031656/parque_np84oq.png"
        }
        //guardamos el nuevo parque en una constante y la devolvemos si esta todo ok (200) o not found(404)
        const saveNewParque = await newParque.save();

        if(saveNewParque){
            return res.status(200).json(saveNewParque);
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
        const parqueById = await Parque.findById(id)
        if(parqueById){
            return res.status(200).json(parqueById)
        }else{
            return res.status(404).json("No ha sido posible encontrar el parque solicitado👎")
        }
    } catch (error) {
        return res.status(404).json(error.message)
    }
};

//-----------GET BY NAME----------------

const getByName = async (req, res, next) => {
    try {
        const {name} = req.params;
        const parqueByName = await Parque.find({name});
        if (parqueByName.length > 0){
            return res.status(200).json(parqueByName);
        }else {
            return res.status(404).json("No se ha podido encontrar el parque 👎")
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
        const allParque = await Parque.find();
        if(allParque.length > 0) {
            return res.status(200).json(allParque);
        }else{
            return res.status(404).json("No ha sido posible encontrar el parque")
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
    await Parque.syncIndexes();
    let takeImage = req.file?.path;
    try {
        const {id} = req.params;
        const parqueById = await Parque.findById(id);
        if (parqueById){
            const imgAntigua = parqueById.image;

            // creamos el cuerpo del cliente, le decimos que si trae algo nuevo se quede con lo nuevo, sino con lo antiguo
            const bodyCliente = {
                _id: parqueById._id,
                image: req.file?.path ? takeImage : imgAntigua,
                name: req.body?.name ? req.body?.name : parqueById.name,
            };
            try {
                await Parque.findByIdAndUpdate(id, bodyCliente);
                if(req.file?.path){
                    deleteImgCloudinary(imgAntigua);
                }

            //testeamos en tiempo real que esto esté funcionando
            const elementoActualizadoById = await Parque.findById(id);
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
            return res.status(404).json("Este parque no existe 👎")
        }
    } catch (error) {
        return res.status(404).json(error);
    }
};

module.exports = { crearParque, getById, getByName, getAll, update}