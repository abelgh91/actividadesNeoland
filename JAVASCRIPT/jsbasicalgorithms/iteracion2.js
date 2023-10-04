const character = {name: 'Jack Sparrow', age: 10};
character.age = 25
console.log (character.age)



let firstName = 'Jon';
let lastName = 'Snow';
let age = 24;
console.log(`soy ${firstName} ${lastName} tengo ${age} años y me gustan los lobos`)

const toy1 = {name: 'Buss myYear', price: 19};
const toy2 = {name: 'Rallo mcKing', price: 29};
let totalprice = toy1.price + toy2.price
console.log(totalprice)


let globalBasePrice = 10000;
const car1 = {name: 'BMW m&m', basePrice: 50000, finalPrice: 60000};
const car2 = {name: 'Chevrolet Corbina', basePrice: 70000, finalPrice: 80000};
globalBasePrice = 25000
car1.finalprice = car1.basePrice+globalBasePrice
car2.finalPrice = car2.basePrice+globalBasePrice
console.log(car1.finalprice)
console.log(car2.finalPrice)



