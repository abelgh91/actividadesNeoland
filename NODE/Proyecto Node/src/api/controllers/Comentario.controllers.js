const Comentario = require("../models/Comentarios.model");
const Parque = require("../models/Parque.model");
const User = require("../models/User.model");

//----------------CREAR COMENTARIO-----------------

const crearComentario = async (req, res, next) => {
    try {
        const { id } = req.params; //id del parque que queremos poner el comentario
        const parque = await Parque.findById(id)
        if (parque) {
            try {
                await Comentario.syncIndexes();
                const nuevoComentario = new Comentario(req.body);
                const guardarComentario = await nuevoComentario.save();
                if (guardarComentario) {
                    if (!parque.comentarios.includes('guardarComentario')) {
                        try {
                            await Parque.findByIdAndUpdate (id, {
                                $push: { comentarios: guardarComentario },
                            });
                            try {
                                const { _id } = req.user;
                                await User.findByIdAndUpdate( _id, {
                                    $push: { comentarios: guardarComentario },
                                });
                                try {
                                    await Comentario.findByIdAndUpdate( guardarComentario._id, {
                                        $push: { Parque: id },
                                    });
                                    try {
                                        await Comentario.findByIdAndUpdate( guardarComentario._id, {
                                            $push: { ComentadoPor: _id },
                                        } )
                                        try {
                                            return res.status(200).json({
                                                comentarioCreado: await Comentario.findById( guardarComentario._id ),
                                            });
                                        } catch (error) {
                                            return res.status(404).json({
                                                error: 'error al crear el comentario',
                                                message: error.message,
                                            }) && next(error)
                                        }
                                    } catch (error) {
                                        return res.status(404).json({
                                            error: 'error en comentario creadoPor',
                                            message: error.message,
                                        }) && next(error)
                                    }
                                    
                                } catch (error) {
                                    return res.status(404).json({
                                        error: 'error en comentario Parque',
                                        message: error.message,
                                    }) && next(error)
                                }
                            } catch (error) {
                                return res.status(404).json({
                                    error: 'error al poner el comentario en el modelo del usuario',
                                    message: error.message,
                                }) && next(error)
                            }
                        } catch (error) {
                            return res.status(404).json({
                                error: 'error al crear el comentario en el modelo de parque',
                                message: error.message,
                            }) && next(error)
                        }
                    } else {
                        return res.status(404).json('Este comentario ya existe!')
                    }
                }

            } catch (error) {
                return res.status(404).json({
                    error: 'error al crear el comentario.Pillado en el catch 👮‍♂️',
                    message: error.message,
                }) && next(error)
            }
        } else {
            return res.status(404).json('Este parque no existe❌')
        }
    } catch (error) {
        return res.status(404).json({
            error: 'error al crear el comentario.Pillado en el ultimo catch 👮‍♂️',
            message: error.message,
        }) && next(error)
    }
}


//---------------BORRAR COMENTARIO------------------

const borrarComentario = async (req, res, next) => {
    try {
      const { id } = req.params; // id del comentario
      const comentarioABorrar = await Comentario.findById(id);
      if (comentarioABorrar.ComentadoPor.includes(req.user?._id)) {
        try {
          await Comentario.findByIdAndDelete(id);
  
          try {
            await Parque.updateMany({ comentarios: id }, { $pull: { comentarios: id } });
  
            try {
              await User.updateMany({ comentarios: id }, { $pull: { comentarios: id } });
  
              try {
                await User.updateMany({ likesComentarios: id }, { $pull: { likesComentarios: id } });
  
                const comentarioBorrado = await Comentario.findById(id);
                return res
                  .status(comentarioBorrado ? 404 : 200)
                  .json(comentarioBorrado ? comentarioBorrado : 'comentario borrado');
              } catch (error) {
                return res.status(404).json({
                  error: 'error en el catch de actualizando User',
                  message: error.message,
                });
              }
            } catch (error) {
              return res.status(404).json({
                error: 'error en el segundo catch actualizando User',
                message: error.message,
              });
            }
          } catch (error) {
            return res.status(404).json({
              error: 'error en el catch actualizando Parque',
              message: error.message,
            });
          }
        } catch (error) {
            return res.status(404).json({
                error: 'error al borrar el comentario.Pillado en el catch 👮‍♂️',
                message: error.message,
            }) && next(error)
        }
      } else {
        return res.status(404).json('esta reseña no es de este usuario');
      }
    } catch (error) {
        return res.status(404).json({
            error: 'error al borrar el comentario.Pillado en el ultimo catch 👮‍♂️',
            message: error.message,
        }) && next(error)
    }
  };

module.exports = { crearComentario, borrarComentario };