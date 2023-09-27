const avengers = ["HULK", "SPIDERMAN", "BLACK PANTHER"];
avengers[0]="IRONMAN"
console.log(avengers)

console.log(avengers.length)

const rickAndMortyCharacters = ["Rick", "Beth", "Jerry"];
rickAndMortyCharacters[3]="Morty"
rickAndMortyCharacters[4]="Summer"

rickAndMortyCharacters[2]
console.log(rickAndMortyCharacters[2])

const rickAndMortyCharacters2 = ["Rick", "Beth", "Jerry", "Morty", "Summer", "Lapiz Lopez"];
rickAndMortyCharacters2.pop()
console.log(rickAndMortyCharacters2[0],rickAndMortyCharacters2[4])

const rickAndMortyCharacters3 = ["Rick", "Beth", "Jerry", "Morty", "Summer", "Lapiz Lopez"];
rickAndMortyCharacters3.splice(2,2)
console.log(rickAndMortyCharacters3)