const { deleteImgCloudinary } = require('../../middleware/files.middleware');
const Ave = require('../models/Ave.model');
const Parque = require('../models/Parque.model');
const User = require('../models/User.model');

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
        const {especie} = req.params;
        const aveByName = await Ave.find({especie});
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
    console.log(req.body)
    await Ave.syncIndexes();
    let takeImage = req.file?.path;
    try {
        const {id} = req.params;
        const aveById = await Ave.findById(id);
        const patchAve = new Ave(req.body);
        // vamos a guardar info que no quiero que el usuario pueda cambiarme
        patchAve.likes = aveById.likes;
        patchAve.visto =  aveById.visto;
        patchAve.parque = aveById.parque;

        if (aveById){
            const imgAntigua = aveById.image;

            // creamos el cuerpo del cliente, le decimos que si trae algo nuevo se quede con lo nuevo, sino con lo antiguo
            const bodyCliente = {
                _id: aveById._id,
                image: req.file?.path ? takeImage : imgAntigua,
                name: req.body?.name ? req.body.name : aveById.name,
                peligro: req.body?.peligro ? req.body.peligro : aveById.peligro,
                age: req.body?.age ? req.body.age : aveById.age,
                provincia: req.body?.provincia ? req.body.provincia : aveById.provincia,
                CCAA: req.body?.CCAA ? req.body.CCAA : aveById.CCAA,
                parque: req.body?.parque ? req.body?.parque : aveById.parque
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
            for(let clave in test){
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

            } catch (error) {
                return res.status(404).json(error.message);
            }
        }else{
            return res.status(404).json("Este ave no existe 👎")
        }
    } catch (error) {
        return res.status(404).json(error.message);
    }
};

//--------------DELETE----------------

const deleteAve = async (req, res, next) => {
    try {
        const {id} = req.params
      const ave = await Ave.findByIdAndDelete(id);
      // si ya hemos borrado el ave borramos su imagen
      deleteImgCloudinary(req.user?.image);
      if(ave){
        try {
            const test = await User.updateMany(
              { aveFav: id },
              { $pull: { aveFav: id } }
            );
            const testTwo = await User.updateMany(
                { aveVistas: id },
                { $pull: { aveVistas: id } }
              );
              try {
                const testThree = await Parque.updateMany(
                  { aves: id },
                  { $pull: { aves: id } }
                );
                // buscamos el user por id para luego en la respuesta lanzar un 404 o un 200 en caso de que exista o que no exista
                const existAve = await Ave.findById(id);
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
          
      }else{
        return res.status(404).json("este ave no existe ❌")
      }
    } catch (error) {
        return res.status(404).json(error.message)
    }
  };

  //-----------GET PELIGRO DE EXTINCION-------------

  const avesPeligro = async (req, res, next) => {

    try {
        const allAves = await Ave.find()
        let peligroExtincion = []

        for(let ave of allAves){
            if(ave.peligro == true){
            peligroExtincion.push(ave.peligro)
        }
        }
        aveEncontradaPorPeligro = await Ave.find({peligro: peligroExtincion})
        res.status(200).json(aveEncontradaPorPeligro)
    } catch (error) {
        return res.status(404).json({
            error: "error al buscar el ave en peligro de extincion. Ha sido pillado en el catch 👮‍♂️",
            message: error.message,
        });
    }
  }

  //-------------GET POR TYPES--------------- 

  const getTipos = async (req, res, next) => {
    try {
        const {types} = req.params;
        const avePorTipo = await Ave.find({types});
        if (avePorTipo.length > 0){
            return res.status(200).json(avePorTipo);
        }else {
            return res.status(404).json("No se ha podido encontrar el ave 👎")
        }
    } catch (error) {
        return res.status(404).json({
            error: "error al buscar por tipo. Ha sido pillado en el catch 👮‍♂️",
            message: error.message,
        });
    }
};

//----------------GET POR AGE---------------

const getAge = async (req, res, next) => {
    try {
        const {age} = req.params;
        const avePorAge = await Ave.find({age});
        if (avePorAge.length > 0){
            return res.status(200).json(avePorAge);
        }else {
            return res.status(404).json("No se ha podido encontrar el ave 👎")
        }
    } catch (error) {
        return res.status(404).json({
            error: "error al buscar por edad. Ha sido pillado en el catch 👮‍♂️",
            message: error.message,
        });
    }
};

//-------------GET POR PROVINCIA--------------

const getPorProvincia = async (req, res, next) => {
    try {
        const {provincia} = req.params;
        const avePorProvincia = await Ave.find({provincia});
        if (avePorProvincia.length > 0){
            return res.status(200).json(avePorProvincia);
        }else {
            return res.status(404).json("No se han registrado aves en esta provincia 👎")
        }
    } catch (error) {
        return res.status(404).json({
            error: "error al buscar por provincia. Ha sido pillado en el catch 👮‍♂️",
            message: error.message,
        });
    }
};

//----------------GET BY CCAA----------------

const getPorCCAA = async (req, res, next) => {
    try {
        const {CCAA} = req.params;
        const avePorCCAA = await Ave.find({CCAA});
        if (avePorCCAA.length > 0){
            return res.status(200).json(avePorCCAA);
        }else {
            return res.status(404).json("No se han registrado aves en esta CCAA👎")
        }
    } catch (error) {
        return res.status(404).json({
            error: "error al buscar por CCAA. Ha sido pillado en el catch 👮‍♂️",
            message: error.message,
        });
    }
};

//-------------GET MAS LIKES ---------------------SORT

const getPorLikes = async (req, res, next) => {
    try {
        const allAves = await Ave.find().populate('likes')
    if(allAves.length > 0){
        allAves.sort((a, b) => b.likes.length - a.likes.length)
    }
    res.status(200).json(allAves)
    } catch (error) {
        return res.status(404).json({
            error: "error al buscar el ave con mas likes. Ha sido pillado en el catch 👮‍♂️",
            message: error.message,
        });
    }

}

//----------------GET MAS VISTAS----------------- //solo quiero el mas visto por los usuarios

const getMasVistas = async (req, res, next) => {
    try {
        const allAvesVistas = await Ave.find()  
        let numeroAveVistas = 0
        let aveMasVista = ''
        for(let ave of allAvesVistas){
            if(ave.visto.length > numeroAveVistas){
                numeroAveVistas = ave.visto.length
                aveMasVista = ave.name
            }
        }
        const aveEncontradaPorName = await Ave.findOne({name: aveMasVista}).populate('visto')
        res.status(200).json(aveEncontradaPorName)
    } catch (error) {
        return res.status(404).json({
            error: "error al buscar el ave mas vista. Ha sido pillado en el catch 👮‍♂️",
            message: error.message,
        });
    }
}

//--------------TOGGLE AVE-PARQUE-----------------

const toggleAveParque = async (req, res, next) => {
    try {
        const {id} = req.params
        const {parque} = req.body
        const aveById = await Ave.findById(id)

        if(aveById.parque.includes(parque)){
            try {
                await Ave.findByIdAndUpdate(id, {
                    $pull: {parque: parque},
                })
                try {
                    await Parque.findByIdAndUpdate(parque, {
                        $pull: {aves: id},
                    })
                    return res.status(200).json({
                        aveUpdate: await Ave.findById(id),
                        parqueUpdate: await Parque.findById(parque),
                        action: `pull idParque ${parque}`,
                    })
                } catch (error) {
                    return res.status(404).json({
                        error: 'error catch update parque pull',
                        message: error.message,
                      });
                }
            } catch (error) {
                return res.status(404).json({
                    error: 'error catch update ave pull',
                    message: error.message,
                  });
            }
        }else{
            try {
                await Ave.findByIdAndUpdate(id, {
                    $push: {parque: parque},
                });
                try {
                    await Parque.findByIdAndUpdate(parque, {
                        $push: {aves: id},
                    })
                    return res.status(200).json({
                        aveUpdate: await Ave.findById(id),
                        parqueUpdate: await Parque.findById(parque),
                        action: `push parque ${parque}`,
                    })
                } catch (error) {
                    return res.status(404).json({
                        error: 'error catch update parque push',
                        message: error.message,
                      });
                }
            } catch (error) {
                return res.status(404).json({
                    error: 'error catch update ave push',
                    message: error.message,
                  });
            }
        }
       
    } catch (error) {
        return (res.status(404).json({message: "Error en el catch del toggle", error: error.message}))
    }

};

module.exports = {
    crearAve, 
    getAll, 
    getById, 
    getByName, 
    update,
    deleteAve,
    avesPeligro,
    getTipos,
    getAge, 
    getPorProvincia,
    getPorCCAA,
    getPorLikes,
    getMasVistas,
    toggleAveParque
}