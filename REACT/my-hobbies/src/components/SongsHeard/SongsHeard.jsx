import { hobbies } from '../../hobbies/Hobbies';
import './SongsHeard.css';

export const SongsHeard = () => {
    const songs = hobbies.songsHeard;
  return (
    <div>
        <p>{songs}</p>
    </div>
  )
};
