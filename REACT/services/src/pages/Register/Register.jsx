import { useEffect, useState } from "react";
import "./Register.css";
import {useForm} from "react-hook-form";
import { registerUser } from "../../services/user.service";
import { useErrorRegister } from "../../hooks/useErrorRegister";

export const Register = () => {

    /*
    1) Estados: 
        1- Estado donde se setea la respuesta
        2- Estado que gestionamos cuando los botones se deshabilitan (la respuesta esta cargando)
        3- Estado que comprueba el ok o no ok de la funcionalidad de la pagina (estado de navegacion)
    */
        const [res, setRes] = useState({});
        const [send, setSend] = useState(false); //cuando yo envio la peticion pero aun no la he recibido (send a true y se deshabilita el boton)
        const [ok, setOk] = useState(false); // res 200 el ok a true

    // 2) Llamamos a los hooks

const { handleSubmit, register } = useForm();

    // ese register es una funcion que nos sirve para registrar el valor que tenemos en el input
    // el handle submit sirve para decir que funcion va a gestionar los datos del formulario
    // los datos que recibimos son registrados en un objeto gracias al register. Este objeto lo recibe la funcion que el handleSubmit haya decidido

    // 3) Funcion que gestiona los datos del formulario (la que decide el handle)

const formSubmit = async (formData) => { // esta funcion llama al servicio
    console.log(formData);

    const customFormData = { // como es required lo añadimos aqui
        ...formData,
        gender: "hombre",
    }

    setSend(true)
    setRes(await registerUser(customFormData))
    setSend(false)
};

    // 4) useEffect que gestiona las respuesta y llaman al customhook que gestiona los errores

useEffect(() => {
    console.log(res)
  // llamamos a un customHook para gestionar posibles errores de la respuesta
  useErrorRegister(res, setOk, setRes)
}, [res])

    // 5) Gestion de los estados de navegacion (ok o no ok)

if (ok) {
console.log("estoy registrado")
// lo llevamos al checkCode confirmation
}
//la linea 54 es el handleSubmit diciendo que funcion gestiona los datos (el formSubmit del paso 3)
  return (
    <>
      <div className="form-wrap">
        <h1>Sign Up</h1>
        <p>It’s free and only takes a minute.</p>
        <form onSubmit={handleSubmit(formSubmit)}> 
          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="name"
              name="name"
              autoComplete="false"
              {...register("name", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              username
            </label>
          </div>
          <div className="password_container form-group">
            <input
              className="input_user"
              type="password"
              id="password"
              name="password"
              autoComplete="false"
              {...register("password", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              password
            </label>
          </div>
          <div className="email_container form-group">
            <input
              className="input_user"
              type="email"
              id="email"
              name="email"
              autoComplete="false"
              {...register("email", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              email
            </label>
          </div>

          <div className="btn_container">
            {console.log(send)}
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#49c1a2" }}
            >
              {send ? "Cargando ...." : "Register"}
            </button>
          </div>
          <p className="bottom-text">
            <small>
              By clicking the Sign Up button, you agree to our{" "}
              <a href="#">Terms & Conditions</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </small>
          </p>
        </form>
      </div>
      <footer>
        <p>
          Already have an account? <a href="#">Login Here</a>
        </p>
      </footer>
    </>
  )
};