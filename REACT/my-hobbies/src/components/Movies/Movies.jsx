import { hobbies } from '../../hobbies/Hobbies';
import './Movies.css'


export const Movies = ({name, type, genre, vote}) => {
    const allMovies = hobbies.movies;
    const movieName = allMovies.map((item)=> item.names)
    const movieType = allMovies.map((item)=> item.type)
    const movieGenres = allMovies.map((item)=> item.genres)
    const movieVote = allMovies.map((item)=> item.vote)

  return (
    <div>
        <p>{name}</p>
        <p>{type}</p>
        <p>{genre}</p>
        <p>{vote}</p>

        {movieName.map((movieName, index)=> (
            <li key={index}>{movieName}</li>
        ))}
        {movieType.map((movieType, index)=> (
            <li key={index}>{movieType}</li>
        ))}
        {movieGenres.map((movieGenres, index)=> (
            <li key={index}>{movieGenres}</li>
        ))}
        {movieVote.map((movieVote, index)=> (
            <li key={index}>{movieVote}</li>
        ))}


    </div>
  )
};