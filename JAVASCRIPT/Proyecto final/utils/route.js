import { getUser } from "../global/state/globalState";
import { Login, PintarPokemon, PintarDashboard, PintarQuiz, PintarTopo} from "../pages";

//! ----------------------------------------------------------------------------------------------------------------------
//? ------------------------------------- CONTROLADOR DE LO QUE SE RENDERIZA EN CADA MOMENTO------------------------------
//! ----------------------------------------------------------------------------------------------------------------------

export const RenderControl = (pagesRender) => {
  console.log("soy el user", getUser().name);
  switch (pagesRender) {
    case undefined:
      localStorage.getItem(getUser().name) ? PintarDashboard() : Login();
      break;
    case "Pokemon":
      PintarPokemon();
      break;
    case "Dashboard":
      PintarDashboard();
      break;
    case "Topo":
      PintarTopo();
      break;
    case "Login":
      Login();
      break;
    case "Quiz":
      PintarQuiz();
      break;
      default:
        console.log("La opcion seleccionada no existe: %s", pagesRender);
  }
};
