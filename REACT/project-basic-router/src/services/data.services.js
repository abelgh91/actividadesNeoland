import { heroes } from "../data/data.heroes";


export const getHeroes = () => heroes;
    
export const getHeroe = (id) => heroes.find(
    heroe => heroe.id.toString() === id
  );
  
export const deleteHeroe = async (id) => heroes = heroes.filter(
    heroe => heroe.id !== id)