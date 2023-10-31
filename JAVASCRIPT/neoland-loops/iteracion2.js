//Comprueba en cada uno de los usuarios que tenga al menos dos trimestres aprobados y añade la propiedad 
// isApproved a true o false en consecuencia. Una vez lo tengas compruébalo con un console.log.

const alumns = [
  {name: 'Pepe Viruela', T1: false, T2: false, T3: true},
{name: 'Lucia Aranda', T1: true, T2: false, T3: true},
{name: 'Juan Miranda', T1: false, T2: true, T3: true},
{name: 'Alfredo Blanco', T1: false, T2: false, T3: false},
{name: 'Raquel Benito', T1: true, T2: true, T3: true},
]


const aprobado =(alumno)=>{
  
  let acc = 0
  if (alumno["T1"]){ //le decimos que sume en cada trimetre
    acc++
  }
  if(alumno["T2"] ){
    acc++
  }
  if(alumno["T3"]){
    acc++
  }
  
  return acc>= 2 ? true : false //si el contador tiene 2 o mas true entonces sera true (aprobado)
}
const newArray = []
for (let i = 0; i< alumns.length; i++){
  newArray.push({...alumns[i],  isApproved: aprobado(alumns[i]) })
}

console.log(newArray) 