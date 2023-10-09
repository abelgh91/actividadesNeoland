import { printTemplateFooter } from "../components/Footer/Footer";
import { printTemplateGallery } from "../components/Gallery/Gallery";
import { printTemplateHeader } from "../components/Header/Header";

export const initTemplate = () => {
    const header = document.createElement("header");
    const footer = document.createElement("footer");
    const main = document.createElement("main");
    const app = document.getElementById("app");
    app.append(header, main, footer);
    printTemplateFooter();
    printTemplateGallery();
    printTemplateHeader();
    
}