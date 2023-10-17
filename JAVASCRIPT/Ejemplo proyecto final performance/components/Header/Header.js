import { getUser } from "../../global/state/globalState";
import { changeColorRGB } from "../../utils";
import { renderControl } from "../../utils/route";
import "./Header.css";

//! ------------------1) TEMPLATE -------------------------------------

const template = () => `
  <img
    src="https://res.cloudinary.com/dqlvldxwc/image/upload/v1697482549/header_wwdl5s.png"
    alt="title hub game website (app)"
    class="logo"
  />
  <nav>
    <img
      src="https://res.cloudinary.com/dqlvldxwc/image/upload/v1697478652/1_bsdato.png"
      alt=" change to style mode page"
      id="changeColor"
    />
    <img
      src="https://res.cloudinary.com/dqlvldxwc/image/upload/v1697478690/2_yedbar.png"
      alt=" navigate to home app"
      id="buttonDashboard"
    />
    <img
      src="https://res.cloudinary.com/dqlvldxwc/image/upload/v1697478719/3_zf17by.png"
      alt="logout"
      id="buttonLogout"
    />
  </nav>
`;

//! ----------------------- 2 ) Añadir los eventos con sus escuchadores

const addListeners = () => {
  // evento click del boton de cambio de color
  const changeColor = document.getElementById("changeColor");
  changeColor.addEventListener("click", (e) => {
    const color = changeColorRGB();
    document.body.style.background = color;
  });

  // evento click del boton que nos lleva a los juegos
  const buttonDashboard = document.getElementById("buttonDashboard");
  buttonDashboard.addEventListener("click", (e) => {
    renderControl("Dashboard");
  });

  // evento del logout
  const buttonLogout = document.getElementById("buttonLogout");
  buttonLogout.addEventListener("click", (e) => {
    const userState = getUser().name;
    const currentUser = localStorage.getItem(userState);
    const parseCurrentUser = JSON.parse(currentUser);
    const updateUser = { ...parseCurrentUser, token: false };
    const stringUpdateUser = JSON.stringify(updateUser);
    localStorage.removeItem(userState);
    sessionStorage.removeItem("currentUser");
    localStorage.setItem(userState, stringUpdateUser);
    renderControl("Login");
  });
};

//! ------------------------------ 3) La funcion que se exporta y que pinta
export const pintarHeader = () => {
  document.querySelector("header").innerHTML = template();
  addListeners();
};
