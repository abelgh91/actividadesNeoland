function findArrayIndex(array, text) {
    const index = array.indexOf(text);
    return index;
  }
  
  const miArray = ['Caracol', 'Mosquito', 'Salamandra', 'Ajolote'];
  
  console.log(findArrayIndex(miArray, 'Salamandra'));
  console.log(findArrayIndex(miArray, 'Tortuga'));
  console.log(findArrayIndex(miArray, 'Mosquito'));