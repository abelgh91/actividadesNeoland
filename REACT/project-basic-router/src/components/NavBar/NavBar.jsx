import { Link } from 'react-router-dom';
import './NavBar.css';

export const NavBar = () => {
  return (
    <div className='btn-nav'>
      <Link to = "listado">Listado de Heroes</Link>
      <Link to = "home">Home</Link>
      <Link to = "about">About</Link>
    </div>
  )
};