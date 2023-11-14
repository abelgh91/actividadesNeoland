import "./CardCharacter.css";

export const CardCharacter = ({name, image, id, status, origin}) => {
  return (
    <figure>
        <img src={image} name={name} />
        <h2>{name}</h2>
        <h4>{id}</h4>
        <h3>{status}</h3>
        <h4>{origin}</h4>
    </figure>
  )
};