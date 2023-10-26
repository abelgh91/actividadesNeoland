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
    const {Character} = req.body;

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


module.exports = {crearMovie, toggleCharacter}