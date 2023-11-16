
import './App.css'
import { Languages, Movies, Read, SongsHeard, Sports } from './components';
import { hobbies } from './hobbies/Hobbies';



export const App=()=> {
  const {read, sports, movies, languages} = hobbies
  const {name:sportName, indoor, favoriteTeam} = sports
  const {name, type, genre:genreMovies, vote} = movies
  const {title, authorName, authorSurname, genreRead, dateOfPublication, authorBirthDate} = read
  const {language, wrlevel, splevel} = languages
  

  return (
    <>
    <div>
    <Read title={title} name={authorName} surname={authorSurname} genre={genreRead} dateofpublication={dateOfPublication} authorbirthdate={authorBirthDate} />
    <Sports name={sportName} indoor={indoor} favoriteteam={favoriteTeam} />
    <Movies name={name} type={type} genre={genreMovies} vote={vote} />
    <Languages language={language} wrlevel={wrlevel} splevel={splevel} />
    <SongsHeard />
    </div>
    </>
  )
};





  