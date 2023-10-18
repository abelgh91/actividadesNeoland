import "./style.css";
import { getInfo, hello, RenderControl, MainRender } from "./utils";

hello();

//! ---------------------------> renderizamos las etiquetas de la estructura inicial
MainRender();

//! ---------------------------> lo ponemos sin parametro para que salte al caso de switch de undefined para evaluar el user
RenderControl();
getInfo();
