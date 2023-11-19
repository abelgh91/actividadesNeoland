import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useErrorRegister = (res, setOk, setRes) => {
    // 200 ok
    if (res?.status == 200) { // optional chaining es fundamental
        setOk(() => true);
        Swal.fire({
          icon: "success",
          title: "Welcome to my Page 💌",
          showConfirmButton: false,
          timer: 1500,
        });
        setRes({});
      }

      // 409 el usuario ya existe (no decirselo al usuario)

      if (res?.response?.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please , your email is incorrect !❎",
          showConfirmButton: false,
          timer: 5000,
        });
        setRes({});
      }

      //la contraseña no esta en el formato correcto
    
      if (res?.response?.data?.includes("validation failed: password")) { // nuestro catch estaba diferente(error)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Min 8 characters, 1 upper case, 1 lower case and a special character ❎",
          showConfirmButton: false,
          timer: 8000,
        });
        setRes({});
      }

       // cuando el userName ya existe
  if (
    res?.response?.data?.error.includes(
      "E11000 duplicate key error collection: userProyect.users"
    )
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Sorry choose another name ❎",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  };

  //  500 : internal server error

  if (res?.response?.status == 500) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Interval server error!❎ Please try again.",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }
};