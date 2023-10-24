const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const  Character  = require("../models/Character.model");

//------------POST CREATE

const create = async (req, res, next) => {

    //vamos a capturar la URL de la imagen que se sube a cloudinary
    //porque la img se sube antes de que acabemos el controlador
    //entonces si hay un error en el controlador, el elemento no se crea
    // y tenemos que borrar la img en cloudinary

    let catchImg = req.file?.path
    try {
        //!--------ACTUALIZAR INDEXES
        //siempre hay que actualizar los indexes, que son las cosas que son unicas
        await Character.syncIndexes();


        //!--------INSTANCIAR UN NUEVO CHARACTER
        //instanciamos un nuevo character y le metemos como info lo que recibimos por la req.body

        const newCharacter = new Character(req.body);

        //!-------VALORAR SI HEMOS REICBIDO UNA IMG
        //si la hemos recibido, metemos la URL en el objeto creado arriba con la nueva instancia del character

        if(req.file){
            newCharacter.img = catchImg
        }else {
            newCharacter.image = 
            "https://res.cloudinary.com/dhkbe6djz/image/upload/v1689099748/UserFTProyect/tntqqfidpsmcmqdhuevb.png";
        }

        //!---------GUARDAMOS LA INSTANCIA DEL NUEVO CHARACTER
        const saveCharacter = await newCharacter.save();

        if(saveCharacter){
            return res.status(200).json(saveCharacter)
        }else{
            res.status(404).json("No se ha podido guardar el elemento en el backend")
        }

    } catch (error) {
        //SI HAY ERROR HAY QUE BORRAR LA IMG DE CLOUDINARY PORQUE SE SUBE ANTES
        //DE QUE NOS METAMOS EN EL CONTROLADOR PORQUE ES UN MIDDLEWARE

        req.file?.path && deleteImgCloudinary(catchImg);
        next(error);
        return (
            res.status(404).json({
                message: "Error en el creado", 
                error: error,
            }) && next(error)
            );
    }
};

module.exports = {
    create,
};