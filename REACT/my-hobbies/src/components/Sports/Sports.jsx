import { hobbies } from '../../hobbies/Hobbies';
import './Sports.css';

export const Sports = ({name, indoor, favouriteteam}) => {
    const sport = hobbies.sports;
    const sportNames = sport.map((item)=> item.name)
    const sportFavorite = sport.map((item)=> item.favoriteTeam)
  return (
    <div>
        <p>{name}</p>
        <p>{indoor}</p>
        <p>{favouriteteam}</p>
        <ul>
        {sportNames.map((sportName, index)=> (
            <li key={index}>{sportName}</li>
        ))}
        </ul>
        <ul>
            {sportFavorite.map((sportfavorite, index)=>(
                <li key={index}>{sportfavorite}</li>
            ))}
        </ul>
    </div>
  )
};