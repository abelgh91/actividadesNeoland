const duplicates = [
    'sushi',
    'pizza',
    'burger',
    'potatoe',
    'pasta',
    'ice-cream',
    'pizza',
    'chicken',
    'onion rings',
    'pasta',
    'soda'
  ];
  const removeDuplicates = [];
duplicates.forEach((comida, index) => {
    !removeDuplicates.includes(comida) && removeDuplicates.push(comida)
});

console.log(removeDuplicates)