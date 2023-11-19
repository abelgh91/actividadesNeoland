import { updateToken } from "../utils";
import { APIUser } from "./service.config";

//! esto es lo que utiliza la pagina a lahora de traerse los datos 

export const registerUser = async (formData) => {
    return APIUser.post("/users/register", formData, { // le damos la ruta, el objeto que le enviamos como body y las modificaciones de los headers
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => res) // devolvemos la respuesta completa
        .catch((error) => error);  // capturamos errores si los hay
};