
import './App.css'
import { Read, Sports, Movies } from './components';
import { hobbies } from './hobbies/Hobbies';


export const App=()=> {
  const {read, sports, movies, languages, songsHeard} = hobbies
  const {title, authorName, authorSurname, genre, dateOfPublication, authorBirthDate} = read
  // const {name, indoor, favoriteTeam} = sports
  // const {name, type, genre, vote} = movies
  

  return (
    <>
    <div>
    <Read title={title} name={authorName} surname={authorSurname} genre={genre} dateofpublication={dateOfPublication} authorbirthdate={authorBirthDate} />
    {/* <Sports name={name} indoor={indoor} favouriteteam={favoriteTeam} />
    <Movies name={name} type={type} genre={genre} vote={vote} /> */}
    </div>
    </>
  )
};