import { dataRicky } from "../../data/data.RickyMorty";
import { CardCharacter } from "../CardCharacter/CardCharacter";
import "./Gallery.css";


export const Gallery = () => {
  const data = dataRicky
  return (
    <div id="container-gallery">
      {
        data.results.map((item) => (
          item.status === "Alive" && <CardCharacter name={item.name} image={item.image} origin={item.origin.name === "unknown" ? "" : item.origin.name} key={item.id} />
        ))}
    </div>
  )
};