import { getUser } from "../global/state/globalState";
import { Login, PrintPokemonPage, printTemplateDashboard, printTemplateQuiz, printTemplateTopo} from "../pages";

//! ----------------------------------------------------------------------------------------------------------------------
//? ------------------------------------- CONTROLADOR DE LO QUE SE RENDERIZA EN CADA MOMENTO------------------------------
//! ----------------------------------------------------------------------------------------------------------------------

export const initControler = (pagesRender) => {
  console.log("soy el user", getUser().name);
  switch (pagesRender) {
    case undefined:
      localStorage.getItem(getUser().name) ? printTemplateDashboard() : Login();
      break;
    case "Pokemon":
      PrintPokemonPage();
      break;
    case "Dashboard":
      printTemplateDashboard();
      break;
    case "Topo":
      printTemplateTopo();
      break;
    case "Login":
      Login();
      break;
    case "Quiz":
      printTemplateQuiz();
      break;
      default:
        console.log("La opcion seleccionada no existe: %s", pagesRender);
  }
};
