import { hobbies } from '../../hobbies/Hobbies';
import './Sports.css';

export const Sports = () => {
    const sport = hobbies.sports;
  return (
    <div>
      {sport.map((item)=>(
        <div key={item.name}>
          <p>{item.name}</p>
          <p>{item.indoor}</p>
          <p>{item.favoriteTeam}</p>
        </div>
      ))}
    </div>
  )
};