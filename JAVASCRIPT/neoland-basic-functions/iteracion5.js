const mixedElements = [6, 1, 'Rayo', 1, 'vallecano', '10', 'upgrade', 8, 'hub'];
let accForEachNumber = 0
let accForEachString = 0

const averageWord=(array)=> {
  let totalNumeros = 0
  let totalStrings = 0
array.forEach(item => typeof item == "number" ? totalNumeros += item : totalStrings += item.length)
return `La suma total de numeros es ${totalNumeros} y la suma total de strings es ${totalStrings}`
}
console.log(averageWord(mixedElements))