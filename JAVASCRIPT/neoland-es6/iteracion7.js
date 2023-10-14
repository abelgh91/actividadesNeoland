// // 7.1

// const exams = [
//     {name: 'Yuyu Cabeza Crack', score: 5}, 
//     {name: 'Maria Aranda Jimenez', score: 1}, 
//     {name: 'Cristóbal Martínez Lorenzo', score: 6}, 
//     {name: 'Mercedez Regrera Brito', score: 7},
//     {name: 'Pamela Anderson', score: 3},
//     {name: 'Enrique Perez Lijó', score: 6},
//     {name: 'Pedro Benitez Pacheco', score: 8},
//     {name: 'Ayumi Hamasaki', score: 4},
//     {name: 'Robert Kiyosaki', score: 2},
//     {name: 'Keanu Reeves', score: 10}
// ];

// const notas = exams.reduce((acumulador, persona)=> acumulador + persona.score, 0)
// console.log(notas)

// // 7.2

// const exams = [
//     {name: 'Yuyu Cabeza Crack', score: 5}, 
//     {name: 'Maria Aranda Jimenez', score: 1}, 
//     {name: 'Cristóbal Martínez Lorenzo', score: 6}, 
//     {name: 'Mercedez Regrera Brito', score: 7},
//     {name: 'Pamela Anderson', score: 3},
//     {name: 'Enrique Perez Lijó', score: 6},
//     {name: 'Pedro Benitez Pacheco', score: 8},
//     {name: 'Ayumi Hamasaki', score: 4},
//     {name: 'Robert Kiyosaki', score: 2},
//     {name: 'Keanu Reeves', score: 10}
// ];

// const alumnosAprobados = exams
// .filter((personas)=> personas.score >= 5); 
// console.log (alumnosAprobados)

// const sumaAlumnos = exams.reduce((acumulador, persona) => acumulador + persona.score, 0)

// console.log(sumaAlumnos/alumnosAprobados.length)

// // 7.3

// const exams = [
//     {name: 'Yuyu Cabeza Crack', score: 5}, 
//     {name: 'Maria Aranda Jimenez', score: 1}, 
//     {name: 'Cristóbal Martínez Lorenzo', score: 6}, 
//     {name: 'Mercedez Regrera Brito', score: 7},
//     {name: 'Pamela Anderson', score: 3},
//     {name: 'Enrique Perez Lijó', score: 6},
//     {name: 'Pedro Benitez Pacheco', score: 8},
//     {name: 'Ayumi Hamasaki', score: 4},
//     {name: 'Robert Kiyosaki', score: 2},
//     {name: 'Keanu Reeves', score: 10}
// ];

// const notas = exams.reduce((acumulador, persona)=> acumulador + persona.score, 0)
// console.log(notas/exams.length)