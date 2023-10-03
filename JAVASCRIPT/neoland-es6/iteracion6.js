//6.1

const numbers = [32, 21, 63, 95, 100, 67, 43];
const numberCien = numbers.find((numeros)=> numeros == 100)
console.log(numberCien)

//6.2

const movies = [
	{title: 'Madagascar', stars: 4.5, date: 2015},
	{title: 'Origen', stars: 5, date: 2010},
	{title: 'Your Name', stars: 5, date: 2016}
];
const movie2010 = movies.find((pelis)=> pelis.date == 2010)
console.log(movie2010)

//6.3

const aliens = [
	{name: 'Zalamero', planet: 'Eden', age: 4029},
	{name: 'Paktu', planet: 'Andromeda', age: 32},
	{name: 'Cucushumushu', planet: 'Marte', age: 503021}
];
const mutations = [
	{name: 'Porompompero', description: 'Hace que el alien pueda adquirir la habilidad de tocar el tambor'},
	{name: 'Fly me to the moon', description: 'Permite volar, solo y exclusivamente a la luna'},
	{name: 'Andando que es gerundio', description: 'Invoca a un señor mayor como Personal Trainer'}
];

const alien1 = aliens.find((alien)=> alien.name === 'Cucushumushu')
const mutations1 = mutations.find((mutacion)=> mutacion.name === 'Porompompero')

if (alien1 && mutations1) {
    const union = {
        ...alien1, mutacion: { ...mutations1 }
    }
    console.log(union);
}else {
    console.log('Este alien o mutacion no existe')
}
