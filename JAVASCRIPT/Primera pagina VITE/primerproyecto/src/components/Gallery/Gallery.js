import "./Gallery.css";

const template = () => ` <section id="galleryContainer"></section> `;

const getData = async () => {
  const allPokemon = [];
  for (let i = 1; i < 151; i++) {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const jsonData = await data.json();
    allPokemon.push(jsonData);
  }
  console.log("🚀 ~ file: Gallery.js:11 ~ getData ~ allPokemon:", allPokemon);

  // llamar a una funcion que mapea los datos y enviamos como parametro allPokemon
  // esa funcion que mapea llamara a unafuncion que pinta la figure de los pokemon
};
export const printTemplateGallery = () => {
  document.querySelector("main").innerHTML = template();
  getData();
};