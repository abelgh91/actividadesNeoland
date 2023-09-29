const numbers = [12, 21, 38, 5, 45, 37, 6];
const average = (array) => {
  let total = 0
  for (let i = 0; i < array.length; i++) {
    total += array[i];
  }
  return total / array.length;
}
console.log("resultado", average(numbers))