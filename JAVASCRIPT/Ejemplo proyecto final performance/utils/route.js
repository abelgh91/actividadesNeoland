import { getUser } from "../global/state/globalState";
import { Login, pintarPokemon, pintarDashboard, pintarQuiz, pintarTopo} from "../pages";

//! ----------------------------------------------------------------------------------------------------------------------
//? ------------------------------------- CONTROLADOR DE LO QUE SE RENDERIZA EN CADA MOMENTO------------------------------
//! ----------------------------------------------------------------------------------------------------------------------

export const renderControl = (pagesRender) => {
  console.log("soy el user", getUser().name);
  switch (pagesRender) {
    case undefined:
      localStorage.getItem(getUser().name) ? pintarDashboard() : Login();
      break;
    case "Pokemon":
      pintarPokemon();
      break;
    case "Dashboard":
      pintarDashboard();
      break;
    case "Topo":
      pintarTopo();
      break;
    case "Login":
      Login();
      break;
    case "Quiz":
      pintarQuiz();
      break;
      default:
        console.log("La opcion seleccionada no existe: %s", pagesRender);
  }
};
