const { deleteImgCloudinary } = require('../../middleware/files.middleware');
const Ave = require('../models/Ave.model');
const Parque = require('../models/Parque.model');
const User = require('../models/User.model');

//-----------------CREAR---------------------

const crearParque = async (req, res, next) => {
  let takeImage = req.file?.path;
  //actualizar
  try {
    await Parque.syncIndexes();
    //creamos una funcion para meterle la info que recibamos por req.body. Esta funcion crea un objeto
    //si recibimos la imagen tenemos que meter la url cogida en takeImage en newParque, sino una img por defecto
    const newParque = new Parque(req.body);
    if (req.file) {
      newParque.image = takeImage;
    } else {
      newParque.image = 
        'https://res.cloudinary.com/dqlvldxwc/image/upload/v1699031656/parque_np84oq.png';
    }
    //guardamos el nuevo parque en una constante y la devolvemos si esta todo ok (200) o not found(404)
    const saveNewParque = await newParque.save();
    if (saveNewParque) {
      return res.status(200).json(saveNewParque);
    } else {
      return res
        .status(404)
        .json('No se ha podido guardar el elemento en la Base de Datos❌⛔');
    }
  } catch (error) {
    //si hay error hay que borrar la img antes de entrar al controlador ya que es un middleware
    req.file?.path && deleteImgCloudinary(takeImage);
    next(error); // porque quiero saber cual es el error
    return res.status(404).json({
        message: 'Error al crear el elemento',
        error: error,
      }) && next(error)
    }
};
//--------------GET BY ID---------------

const getById = async (req, res, next) => {
  try {
    //destructuring del id (porque nos lo han pedido por id, entonces lo buscamos) y luego guardamos
    // en una funcion el id que hemos encontrado
    const {id} = req.params;
    const parqueById = await Parque.findById(id)
    if (parqueById) {
      return res.status(200).json(parqueById);
    } else {
      return res
        .status(404)
        .json('No ha sido posible encontrar el parque solicitado👎')
    }
  } catch (error) {
    return res.status(404).json(error.message)
  }
};

//-----------GET BY NAME----------------

const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const parqueByName = await Parque.find({ name });
    if (parqueByName.length > 0) {
      return res.status(200).json(parqueByName);
    } else {
      return res.status(404).json('No se ha podido encontrar el parque 👎')
    }
  } catch (error) {
    return res.status(404).json({
      error: 'error al buscar por nombre. Ha sido pillado en el catch 👮‍♂️',
      message: error.message,
    });
  }
};

//----------------GET ALL-----------------

const getAll = async (req, res, next) => {
  try {
    const allParque = await Parque.find();
    if (allParque.length > 0) {
      return res.status(200).json(allParque);
    } else {
      return res.status(404).json('No ha sido posible encontrar el parque');
    }
  } catch (error) {
    return res.status(404).json({
      error: 'error al buscar. Lo ha pillado el catch 👮‍♂️',
      message: error.message,
    });
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
        const patchParque = new Parque(req.body);
        // vamos a guardar info que no quiero que el usuario pueda cambiarme
        patchParque.likes = parqueById.likes;
        patchParque.visitado = parqueById.visitado;
        patchParque.aves = parqueById.aves;

        if (parqueById){
            const imgAntigua = parqueById.image;

            // creamos el cuerpo del cliente, le decimos que si trae algo nuevo se quede con lo nuevo, sino con lo antiguo
            const bodyCliente = {
                _id: parqueById._id,
                image: req.file?.path ? takeImage : imgAntigua,
                name: req.body?.name ? req.body?.name : parqueById.name,
                superficie: req.body?.superficie ? req.body?.superficie : parqueById.superficie
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
                //si el tipo de elementoactualizadobyid es un boolean lo convertimos toString, sino no
                if(typeof elementoActualizadoById[item] == 'boolean'){
                    if(req.body[item].toString() == elementoActualizadoById[item].toString()){
                        test[item] = true
                    }else {
                        test[item] = false
                    }
                }else{
                    if(req.body[item] == elementoActualizadoById[item]){
                        test[item] = true
                    }else {
                        test[item] = false
                    }
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

//-------------DELETE-----------------

const deleteParque = async (req, res, next) => {
    try {
        const {id} = req.params
        const parque = await Parque.findByIdAndDelete(id);
      // si ya hemos borrado el parque borramos su imagen
      deleteImgCloudinary(req.user?.image);
      if(parque){
        try {
            const test = await User.updateMany(
              { parqueFav: id },
              { $pull: { parqueFav: id } }
            );
            const testTwo = await User.updateMany(
                {parqueVisitado: id},
                {$pull: {parqueVisitado: id}}
            );
              try {
                const testThree = await Ave.updateMany(
                  { parque: id },
                  { $pull: { parque: id } }
                );
                // buscamos el user por id para luego en la respuesta lanzar un 404 o un 200 en caso de que exista o que no exista
                const existParque = await Parque.findById(id);
                return res.status(existParque ? 404 : 200).json({
                deleteTest: existParque ? false : true,
                }); 
                
              } catch (error) {
                return res.status(404).json({
                  error: 'error catch delete Ave',
                  message: error.message,
                });
                }
            } catch (error) {
                return res.status(404).json({
                  error: 'error catch delete User',
                  message: error.message,
                })};
      }else{
        return res.status(404).json("este parque no existe ❌")
      }
    } catch (error) {
        return res.status(404).json(error);
    }
  };

  //------------GET POR CCAA----------

  const getCCAA = async (req, res, next) => {
    try {
        const {CCAA} = req.params;
        const getParqueCCAA = await Parque.find({CCAA});
        if (getParqueCCAA.length > 0){
            return res.status(200).json(getParqueCCAA);
        }else {
            return res.status(404).json("No se ha podido encontrar 👎")
        }
    } catch (error) {
        return res.status(404).json({
            error: "error al buscar por CCAA. Ha sido pillado en el catch 👮‍♂️",
            message: error.message,
        });
    }
};

//----------------GET POR PROVINCIA----------

const getProvincia = async (req, res, next) => {
    try {
        const {provincia} = req.params;
        const getParqueProvincia = await Parque.find({provincia});
        if (getParqueProvincia.length > 0){
            return res.status(200).json(getParqueProvincia);
        }else {
            return res.status(404).json("No se ha podido encontrar 👎")
        }
    } catch (error) {
        return res.status(404).json({
            error: "error al buscar por CCAA. Ha sido pillado en el catch 👮‍♂️",
            message: error.message,
        });
    }
};

//------------GET MAS AVES--------------------

const getMasAves = async (req, res, next) => {
    try {
        const allParques = await Parque.find();
        let longitudMaxima = 0
        let nombreParque = ""
        for(let parque of allParques){
            if(parque.aves.length > longitudMaxima){
                longitudMaxima = parque.aves.length
                nombreParque = parque.name
            }
        }
        console.log(nombreParque)
        parqueEncontradoporName = await Parque.find({name: nombreParque}).populate('aves')
        res.status(200).json(parqueEncontradoporName)
    } catch (error) {
        return res.status(404).json({
            error: "error al buscar el parque con mas aves. Ha sido pillado en el catch 👮‍♂️",
            message: error.message,
        });
    }
};

//----------GET SOLO PARQUES CON LIKES -------------

const getParqueConLikes = async (req, res, next) => {
    try {
      const parqueLikes = await Parque.find()
      const parquesConLikes = parqueLikes.filter((parque) => parque.likes.length > 0)
        return res.status(200).json(parquesConLikes)
    
    } catch (error) {
      return res.status(404).json(error.message)
    }
  }

//--------------GET MAS GRANDE---------------------
const getMasSuperficie = async (req, res, next) => {
    try {
        const allParques = await Parque.find()
        if(allParques.length > 0){
         allParques.sort((a, b) => b.superficie - a.superficie)
            return res.status(200).json(allParques[0])
        }else{
            return res.status(404).json('error al traer el mas grande')
        }
    } catch (error) {
        return next(setError(500, error.message || 'Error to find'))
        }
}

//----------------TOGGLE PARQUE-AVE------------------

const toggleParqueAve = async (req, res, next) => {
    try {
        const {id} = req.params;   // Buscamos el parque por Id
        const {aves} = req.body;  //Metemos las aves por el body

        const parqueById = await Parque.findById(id)  // Buscamos por id el parque

        if(parqueById.aves.includes(aves)){
            try {
                await Parque.findByIdAndUpdate(id, {
                    $pull: {aves: aves},
                });
                try {
                    await Ave.findByIdAndUpdate(aves, {
                        $pull: {parque: id}
                    });
                    return res.status(200).json({
                        parqueUpdate: await Parque.findById(id),
                        aveUpdate: await Ave.findById(aves),
                        action: `pull aves ${aves}`,
                      });
                } catch (error) {
                    return res.status(404).json({
                        error: 'error catch update ave pull',
                        message: error.message,
                      });
                }
            } catch (error) {
                return res.status(404).json({
                    error: 'error catch update Parque pull',
                    message: error.message,
                  });
            }
        }else{
            try {
                await Parque.findByIdAndUpdate(id, {
                    $push: {aves: aves},
                });
                try {
                    await Ave.findByIdAndUpdate(aves, {
                        $push: {parque: id}
                    });
                    return res.status(200).json({
                        parqueUpdate: await Parque.findById(id),
                        aveUpdate: await Ave.findById(aves),
                        action: `push idAve ${aves}`,
                      });
                } catch (error) {
                    return res.status(404).json({
                        error: 'error catch update ave push',
                        message: error.message,
                      });
                }
            } catch (error) {
                return res.status(404).json({
                    error: 'error catch update Parque push',
                    message: error.message,
                  });
            }
        }
    } catch (error) {
        return next(setError(500, error.message || 'Error general'));
    }
}

//-----------------SORT SUPERFICIE-------------------

const sortSuperficie = async (req, res, next) => {
    try {
        const allParques = await Parque.find()
        if(allParques.length > 0){
         allParques.sort((a, b) => b.superficie - a.superficie)
            return res.status(200).json(allParques)
        }else{
            return res.status(404).json('error al ordenar por superficie')
        }
    } catch (error) {
        return next(setError(500, error.message || 'Error to find'))
        }
}

//-----------------SORT POR LIKES--------------------

const sortLikes = async (req, res, next) => {
    try {
        const allParques = await Parque.find()
        if(allParques.length > 0){
            allParques.sort((a, b) => b.likes.length - a.likes.length)
            const parquesSort = allParques.sort((a, b) => b.likes.length - a.likes.length)
            return res.status(200).json(parquesSort)
        }else{
            res.status(404).json('error al ordenar por likes')
        }
    } catch (error) {
        return next(setError(500, error.message || 'Error to find'))
    }
}

//-------------SORT MAS VISITADO-------------------

const sortVisitado = async (req, res, next) => {
    try {
        const allParques = await Parque.find().populate("visitado");
        if(allParques.length > 0){
            allParques.sort((a, b) => b.visitado - a.visitado)
            return res.status(200).json(allParques)
        }else{
            return res.status(404).json('error al ordenar por visitado')
        }
    } catch (error) {
        return next(setError(500, error,messsage || 'Error to find'))
    }
}

module.exports = { crearParque, getById, getByName, getAll, update, deleteParque,getCCAA, getProvincia, getMasAves, toggleParqueAve, sortSuperficie, sortLikes, sortVisitado, getMasSuperficie, getParqueConLikes }