const nameFinder = [
    'Peter',
    'Steve',
    'Tony',
    'Natasha',
    'Clint',
    'Logan',
    'Xabier',
    'Bruce',
    'Peggy',
    'Jessica',
    'Marc'
  ];
 function finderName(nombres){
  for (let i = 0; i < nombres.length; i++){
    if(nameFinder[i] === 'Clint'){
      return 'Clint ' +`ha sido encontrado en la posicion `+ i;
    }
  }
  return 'Clint '+ `no ha sido encontrado`
 }
 const nombreBuscado = 'Clint'
 const resultado = finderName(nombreBuscado)

 console.log(resultado)