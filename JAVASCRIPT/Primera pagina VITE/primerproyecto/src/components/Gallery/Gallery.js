import { printCardPokemon } from "../CardPokemon/CardPokemon";
import "./Gallery.css";

const template = () => ` <section id="galleryContainer"></section> `;

const getData = async () => {
  const allPokemon = [];
  for (let i = 1; i < 151; i++) {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const jsonData = await data.json();
    allPokemon.push(jsonData);
  }
  console.log(allPokemon);
  mappeoData(allPokemon);
  // esa funcion que mapea llamara a unafuncion que pinta la figure de los pokemon
};
 // llamar a una funcion que mapea los datos y enviamos como parametro allPokemon
const mappeoData = (data) => {
  console.log(data)
  const dataMapp = data.map((item, index)=>({
    name:item.name,
    image:item.sprites?.other?.dream_world?.front_default,
    type: item.types[0].type.name,
  }))
  console.log(dataMapp);
  printFigure(dataMapp)
}

const printFigure = (data) => {
  data.map((item, index) => printCardPokemon(item)); 

}

export const printTemplateGallery = () => {
  document.querySelector("main").innerHTML = template();
  getData();
};