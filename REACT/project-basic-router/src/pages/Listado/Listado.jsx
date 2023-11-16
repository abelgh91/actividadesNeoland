import { Cards, Header } from '../../components';
import { getHeroes } from '../../services/data.services';
import './Listado.css';

export const Listado = () => {
    const data = getHeroes()
  return (
    <div>
        {data.map((heroe) => (
            <Cards id={heroe.id} name={heroe.name} age={heroe.age} alias={heroe.alias} key={heroe.id} />
        ))}
    </div>
  )
};