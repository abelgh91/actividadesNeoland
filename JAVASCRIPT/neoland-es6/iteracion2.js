//2.1

const game = {title: 'The last us 2', gender: ['action', 'zombie', 'survival'], year: 2020}

const{title, gender, year} = game
console.log(`El titulo del juego es ${title}`)
console.log(`el genero del juego es ${gender}`)
console.log(`el year del juego es ${year}`)

//2.2

const fruits = ['Banana', 'Strawberry', 'Orange'];

const [fruit1, fruit2, fruit3] = fruits

console.log(`fruit1: ${fruit1}`)
console.log(`fruit2: ${fruit2}`)
console.log(`fruit3: ${fruit3}`)

//2.3

const animalFunction = () => {
    return {name: 'Bengal Tiger', race: 'Tiger'}
};
const {name, race} = animalFunction()
console.log(`El nombre del animal es ${name}`)
console.log(`La raza del animal es ${race}`)

//2.4

const car = {name: 'Mazda 6', itv: [2015, 2011, 2020] }
const {name, itv} = car
const [year1, year2, year3]= itv

console.log(`El modelo del coche es ${name}`)
console.log(`Su primera itv fue en ${year1}`)
console.log(`Su segunda itv fue en ${year2}`)
console.log(`Su ultima itv fue en ${year3}`)