import { PrintTemplateHeader, PrintTemplateFooter } from "../components";

export const initTemplate = () => {
  const app = document.getElementById("app");

  const header = document.createElement("header");
  const main = document.createElement("main");
  const footer = document.createElement("footer");

  console.log(app);

  app.append(header, main, footer);
  PrintTemplateHeader();
  PrintTemplateFooter();
};

export const hello = () => {
  console.log("hello");
};