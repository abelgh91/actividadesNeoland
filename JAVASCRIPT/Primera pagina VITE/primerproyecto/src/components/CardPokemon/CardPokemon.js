import "./CardPokemon.css";

const template = ({name, image, type}) => `
<figure class=${type}>
    <div>
        <img class=${name} src=${image} alt=${name} />
    </div>
    <h3>${name}</h3>
</figure>

`;

export const printCardPokemon = (pokemon) => {
    document.getElementById("galleryContainer").innerHTML += template(pokemon)
}