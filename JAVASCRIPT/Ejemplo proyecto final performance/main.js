import "./style.css";
import { getInfo, hello, renderControl, mainRender } from "./utils";

hello();

//! ---------------------------> renderizamos las etiquetas de la estructura inicial
mainRender();

//! ---------------------------> lo ponemos sin parametro para que salte al caso de switch de undefined para evaluar el user
renderControl();
getInfo();
