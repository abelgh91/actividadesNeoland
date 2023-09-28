const avengers = ['Hulk', 'Thor', 'IronMan', 'Captain A.', 'Spiderman', 'Captain M.'];
const findLongestWord = (array) => {
  let longitudMaxima = 0
  let palabraMasLarga = ""
  for (let i = 0; i < array.length; i++) {
if (array[i].length > longitudMaxima) {
    longitudMaxima = array[i].length
    palabraMasLarga = array[i]
}
  }
  return palabraMasLarga
}
console.log(findLongestWord(avengers))
