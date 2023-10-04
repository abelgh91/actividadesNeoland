//4.1

const avengers = ["HULK", "SPIDERMAN", "BLACK PANTHER"];
const hulk = avengers[0];
console.log(hulk)

//4.2
avengers[0]="IRONMAN"
console.log(avengers)

//4.3
console.log(avengers.length)

//4.4
const rickAndMortyCharacters = ["Rick", "Beth", "Jerry"];
rickAndMortyCharacters[3]="Morty"
rickAndMortyCharacters[4]="Summer"
console.log(rickAndMortyCharacters)
console.log(rickAndMortyCharacters[2])

//4.5
const rickAndMortyCharacters2 = ["Rick", "Beth", "Jerry", "Morty", "Summer", "Lapiz Lopez"];
rickAndMortyCharacters2.pop()
console.log(rickAndMortyCharacters2[0],rickAndMortyCharacters2[4])

//4.6
const rickAndMortyCharacters3 = ["Rick", "Beth", "Jerry", "Morty", "Summer", "Lapiz Lopez"];
rickAndMortyCharacters3.splice(1, 1)
console.log(rickAndMortyCharacters3)