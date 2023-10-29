const Character = require("../Models/Character.models");
const Movie = require("../Models/Movie.models");

//CREATE

const crearMovie = async (req, res, next) => {
    try {
        await Movie.syncIndexes(); // actualizamos
        const newMovie = new Movie(req.body); //instanciamos una nueva movie y la guardamos en otra constante
        const savedMovie = await newMovie.save();
        return res.status(savedMovie ? 200 : 404).json(savedMovie ? savedMovie : "error al actualizar la pelicula❌")
    } catch (error) {
        return (res.status(404).json({
            error: "error desde el catch 👮‍♂️",
            message: error.message,
        }) && next(error)
        );
    }
};

//AÑADIR O BORRAR UN CHARACTER

const toggleCharacter = async (req, res, next) => {
try {
    const {id} = req.params; //id de la movie que queremos que se actualice
    const {characters} = req.body;
    console.log(characters)

    const movieById = await Movie.findById(id); //buscamos la movie a ver si existe
    if (movieById){
        const arrayIdCharacters = characters.split(","); //cogemos el string y lo transformamos con un array separado por comas
        //recorremos el array y vemos si tenemos que añadirlo o sacarlo en caso de que ya exista
        Promise.all(
        arrayIdCharacters.map(async(character, index)=>{
            if(movieById.characters.includes(character)){
                try {
                    await Movie.findByIdAndUpdate(id, {$pull: {characters: character}, // entramos en characters y si existe lo sacamos con el pull
                    });

                    //ahora sacamos la movie del array de movies en el objeto de characters
                    try {
                        await Character.findByIdAndUpdate(character, {$pull: {movies: id},
                        });
                    } catch (error) {
                        res.status(404).json({
                            error: "error update character",
                            message: error.message,
                        }) && next(error);
                    }
                } catch (error) {
                    res.status(404).json({
                        error: "error update movie",
                        message: error.message,
                    }) && next(error);
                }
            }else{
                //si no esta el personaje pues lo incluimos con el push, igual que arriba pero cambiando pull por push para que lo añada
                try {
                    await Movie.findByIdAndUpdate(id, {
                      $push: { characters: character },
                    });
                    try {
                        await Character.findByIdAndUpdate(character, {
                          $push: { movies: id },
                        });
                    } catch (error) {
                        res.status(404).json({
                          error: "error update character",
                          message: error.message,
                        }) && next(error);
                      }
                    } catch (error) {
                        res.status(404).json({
                          error: "error update movie",
                          message: error.message,
                        }) && next(error);
                      }
            }
        })
     ).then(async () => {
        res.status(200).json({
            dataUpdate: await Movie.findById(id),
        });
     });
    }else{
        res.status(404).json("Esta movie no existe ❌")
    }
} catch (error) {
    return (res.status(404).json({
        error: "error en el catch 👮‍♂️",
        message: error.messsage,
    }) && next(error)
    );
}

};

//GET ById

const getById = async (req, res, next) => {
    try {
        const {id} = req.params;
    const movieById = await Movie.findById(id);
    if(movieById){
        return res.status(200).json(movieById)
    }else{
        return res.status(404).json("No se ha podido encontrar la movie 👎")
    }
    } catch (error) {
        return res.status(404).json(error.message);
    }
};

//GET ByName

const getByName = async (req, res, next)=> {
    try {
        const {name} = req.params;
        const movieByName = await Movie.find({name});
        if (movieByName.length >0){
            return res.status(200).json(movieByName)
        }else{
            return res.status(404).json("No se ha podido encontrar 👎")
        }
    } catch (error) {
        return res.status(404).json({
            error: "error capturado en el catch 👮‍♂️",
            message: error.message
        });
    }
};

//GET ByAll

const getAll = async (req, res, next) => {
    try {
        const allMovies = await Movie.find()
        if(allMovies.length>0){
            return res.status(200).json(allMovies)
        }else{
            return res.status(404).json("No se ha podido encontrar la movie ❌")
        }
        } catch (error) {
        return res.status(404).json
            ({
                error: "No se ha podido encontrar la movie. Error desde el catch 👮‍♂️",
                message: error.message
            });
    }
};


//UPDATE

const update = async (req, res, next) => {
    await Movie.syncIndexes();
    try {
        const {id} = req.params;
        const movieById = await Movie.findById(id);
        if(movieById){
            const customBody = {
                _id: movieById._id,
                name: req.body?.name ? req.body?.name : movieById.name,
                year: req.body?.year ? req.body?.year : movieById.year,
                // characters: req.body?.characters ? req.body?.characters : movieById.characters
            };
            try {
                await Movie.findByIdAndUpdate(id, customBody);
                const elementUpdateById = await Movie.findById(id);
                const elementUpdate = Object.keys(req.body);
                let test = {};
                elementUpdate.forEach((item)=>{
                    if(req.body[item] === elementUpdateById[item]){
                        test[item] = true
                    }else{
                        test[item] = false
                    }
                });

                let acc = 0;
                for(clave in test){
                    test[clave] == false && acc++
                };
                if(acc > 0){
                    return res.status(404).json({
                        dataTest: test,
                        updated: false
                    });
                }else{
                    return res.status(200).json({
                        dateTest: test,
                        updated: true
                    });
                }
            } catch (error) {
                return res.status(404).json("Error al actualizar la movie desde el catch 👮‍♂️")
            }
        }
    } catch (error) {
        return res.status(404).json(error)
    }
};

//DELETE

const eliminarMovie = async (req, res, next) => {
    try {
        const {id} = req.params;
        const movie = await Movie.findByIdAndDelete(id);

        if(movie){
            const findByIdMovie = await Movie.findById(id); 

            try {
                const test = await Character.updateMany(
                    { movies: id },
                    { $pull: { movies: id } }
                  );
                  console.log(test);

                  return res.status(findByIdMovie ? 404 : 200).json({
                    deleteTest: findByIdMovie ? false : true,
                });
            } catch (error) {
                }
        }else {
            return res.status(404).json("Esta movie no existe ❌")
        }
    } catch (error) {
        return res.status(404).json(error);
    }
};

module.exports = {crearMovie, toggleCharacter, getById, getByName, getAll, update, eliminarMovie}