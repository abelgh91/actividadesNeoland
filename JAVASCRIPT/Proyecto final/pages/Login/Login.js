import { setUser, setUserData } from "../../global/state/globalState";
import { RenderControl } from "../../utils/route";
import { PintarDashboard } from "../Dashboard/Dashboard";
import "./Login.css";
const template = () => `
  <div id="containerLogin">
    <h1 id="titleLogin">LOGIN</h1>
    <input type="text" name="username" placeholder="Maria, Itziar, Hugo..." id="username" required/>
    <button id="buttonLogin"></button>
  </div>
`;

const addListeners = () => {
  const buttonLogin = document.getElementById("buttonLogin");
  const username = document.getElementById("username");
  buttonLogin.addEventListener("click", (e) => {
    const valueInput = username.value;
    const userToLocalStorage = {
      token: true,
      name: valueInput,
      fav: [],
    };
    
    if (localStorage.getItem(`${valueInput}USER`)) {
      const localUser = localStorage.getItem(`${valueInput}USER`);
      const parseUser = JSON.parse(localUser);
      parseUser.token = true;

      const stringUser = JSON.stringify(parseUser);
      localStorage.setItem(`${valueInput}USER`, stringUser);
      sessionStorage.setItem("currentUser", `${valueInput}USER`);
      setUser(`${valueInput}USER`);

      setUserData(parseUser);
      console.log(
        "🚀 ~ file: Login.js:35 ~ buttonLogin.addEventListener ~ parseUser:",
        parseUser
      );
    } else {
      const customUser = {
        name: username.value,
        fav: [],
        token: true,
      };
      const stringUser = JSON.stringify(customUser);
      localStorage.setItem(`${valueInput}USER`, stringUser);
      sessionStorage.setItem("currentUser", `${valueInput}USER`);
      setUser(`${valueInput}USER`);
      setUserData(customUser);
    }

    RenderControl();
  });
};

export const Login = () => {
  document.querySelector("nav").style.display = "none";
  document.querySelector("main").innerHTML = template();
  addListeners();
};
