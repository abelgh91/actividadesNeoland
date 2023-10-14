const template = () => `
  <div id="Topo">
    <h1>WACKA TOPO</h1>
  </div>
`;

export const printTemplateTopo = () => {
  document.querySelector("main").innerHTML = template();
  document.querySelector("nav").style.display = "flex";
  // addEventListeners();
  console.log("topo cargado");
};