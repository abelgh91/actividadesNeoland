import { printTemplateNav } from "../Nav/Nav";
import "./Header.css";

// ----> 1) template con la imagen el logo, el titulo y la nav

const template = () => `
  <div class="containerLogo">
    <img
      src="https://res.cloudinary.com/dq186ej4c/image/upload/v1696587230/pinpng.com-pokedex-png-6639628_u19jho.png"
      alt="logo de la pagina"
      id="logo"
    />
    <h1>POKEDEX</h1>
  </div>
  <div id="containerNav"></div>
`;
//----> 2) Funcion que pinta --->
export const printTemplateHeader = () => {
  document.querySelector("header").innerHTML = template();
  printTemplateNav();
};