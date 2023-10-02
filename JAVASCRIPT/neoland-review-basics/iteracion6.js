function swap(array, x, y) {
const intercambio = array[x]
array[x]=array[y]
array[y]=intercambio

return array
}
const fakeCharacters = ['Mesirve', 'Cristiano Romualdo', 'Fernando Muralla', 'Ronalguiño']
console.log(swap(fakeCharacters, 1, 3))