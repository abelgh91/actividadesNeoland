import { useState, useEffect, useRef } from 'react';
import './ButtonFilter.css';
import { useDebounce } from 'use-debounce';


export const ButtonFilter = () => {
    const [filter, setFilter] = useState("");
    const filterRef = useRef(filter); //Utilizamos useRef para guardar el valor actual del filtro sin tener que realizar otras renderizaciones
    const [pokemonCollection, setPokemonCollection] = useState([]); // pokemonCollection es un array con el objeto del pokemon que hayamos buscado en el filter anterior
    const [debounceFilter] = useDebounce(filterRef.current, 500); // es un hook que ponemos cuando hay muchas llamadas. Le ponemos 0.5 segundos de espera

    useEffect(() => {
        filterRef.current = filter; //Aqui guardamos el valor actual del filtro, si el filtro se modifica, se ejecuta de nuevo el useEffect
    }, [filter]);

  useEffect(() => {
    const getPokemonFiltered = async () => { // llamamos a la api
      const pokemonList = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${filter}`  // llevamos el filter a la pagina de todos los pokemon de la api
      );

      const pokemonListToJson = await pokemonList.json();

      return { //pedimos solamente el nombre y la foto de la lista que hemos pasado a JSON
        ...pokemonListToJson,
        name: pokemonListToJson.name,
        image: pokemonListToJson.sprites.front_shiny,
      };
    };

    getPokemonFiltered().then((pokemon) => setPokemonCollection([pokemon])); //cuando tengamos el pokemon buscado lo seteamos y actualizamos la coleccion de pokemon
  }, [debounceFilter]); // en realidad debouncedFilter es el filterRef, es decir, el ultimo valor del input
  return (
    <div>
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />

        <ul>
        {pokemonCollection.map((pokemon) => (
            <li key={pokemon.name}>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name} />
            </li>
        ))}
        </ul>
    </div>
  )
};