import { hobbies } from '../../hobbies/Hobbies';
import './Read.css';

export const Read = ({title, name, surname, genre, dateofpublication, authorbirthdate}) => {
  return (
    <div>
        <p>{title}</p>
        <p>{name}</p>
        <p>{surname}</p>
        <p>{genre}</p>
        <p>{dateofpublication}</p>
        <p>{authorbirthdate}</p>
    </div>
  )
};