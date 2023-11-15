import { hobbies } from '../../hobbies/Hobbies';
import './Movies.css'


export const Movies = () => {
    const allMovies = hobbies.movies;
  return (
    <div>
        {allMovies.map((item) => (
        <div key={item.name}>
          <p>{item.name}</p>
          <p>{item.type}</p>
          <p>{item.genre}</p>
          <p>{item.vote}</p>
        </div>
      ))}
    </div>
  )
};