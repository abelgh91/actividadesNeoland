import { getUser } from "../../global/state/globalState";
import { changeColorRGB } from "../../utils";
import { RenderControl } from "../../utils/route";
import "./Header.css";

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

const addListeners = () => {
  
  const changeColor = document.getElementById("changeColor");
  changeColor.addEventListener("click", (e) => {
    const color = changeColorRGB();
    document.body.style.background = color;
  });
  
  const buttonDashboard = document.getElementById("buttonDashboard");
  buttonDashboard.addEventListener("click", (e) => {
    RenderControl("Dashboard");
  });
  
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
    RenderControl("Login");
  });
};

export const PintarHeader = () => {
  document.querySelector("header").innerHTML = template();
  addListeners();
};
