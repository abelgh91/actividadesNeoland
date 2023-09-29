const counterWords = [
    'code',
    'repeat',
    'eat',
    'sleep',
    'code',
    'enjoy',
    'sleep',
    'code',
    'enjoy',
    'upgrade',
    'code'
  ];

const countElement = [];

counterWords.forEach((material, index) => {
    let acc = 0
    countElement.forEach((count, index) => {
        count.element.includes(material) && acc++;
    })
    if (acc == 0){
        acc = 0;
        counterWords.forEach((materialCount, index) => {
            material == materialCount && acc++;
        })
        countElement.push({
            element: material,
            repeat: acc,
        });
    }
})

console.log(countElement);