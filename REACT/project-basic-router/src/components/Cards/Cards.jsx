import './Cards.css';

export const Cards = ({id, name, age, alias}) => {
  return (
    <>
    <p>{id}</p>
    <p>{name}</p>
    <p>{age}</p>
    <p>{alias}</p>
    </>
  )
};