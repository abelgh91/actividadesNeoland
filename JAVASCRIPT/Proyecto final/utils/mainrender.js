import { PintarHeader, PintarFooter } from "../components";

export const MainRender = () => {
  const app = document.getElementById("app");

  //? -------> vamos a crear los elementos
  const header = document.createElement("header");
  const main = document.createElement("main");
  const footer = document.createElement("footer");

  //? -------> inyectamos os elementos en el contenedor de la app
  console.log(app);

  app.append(header, main, footer);
  // no se pinta el main porque es dinamico
  PintarHeader();
  PintarFooter();
};

export const hello = () => {
  console.log("hello");
};
