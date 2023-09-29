const numbers = [1, 2, 3, 5, 45, 37, 58];

const sumAll = (array) => {
  let total = 0
for (let i = 0; i < array.length; i++) {
    total += array[i];
}
return total;
}
console.log(sumAll(numbers))