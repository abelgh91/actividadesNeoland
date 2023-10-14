//2.1

const game = {title: 'The last us 2', gender: ['action', 'zombie', 'survival'], year: 2020}

const {title, gender, year} = game
console.log(`el titulo del juego es ${title}`)
console.log(`el genero del juego es ${gender}`)
console.log(`el año del juego es ${year}`)


//2.2

const fruits = ['Banana', 'Strawberry', 'Orange'];

const [fruit1, fruit2, fruit3] = fruits

console.log(`la fruit 1 es ${fruit1}`)
console.log(`la fruit 2 es ${fruit2}`)
console.log(`la fruit 3 es ${fruit3}`)

//2.3

const animalFunction = () => {
    return {name: 'Bengal Tiger', race: 'Tiger'}
};

const {name, race} = animalFunction()
console.log(name);
console.log(race)

//2.4

const car = {name: 'Mazda 6', itv: [2015, 2011, 2020] }

//const{name, itv} = car
console.log(car)

const [year1, year2, year3] = itv
console.log(`la primera itv fue en ${year1}`)
console.log(`la segunda itv fue en ${year2}`)
console.log(`la tercera itv fue en ${year3}`)