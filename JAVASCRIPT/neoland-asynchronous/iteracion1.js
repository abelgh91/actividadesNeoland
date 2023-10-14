//1.1 Utiliza esta url de la api Agify 'https://api.agify.io?name=michael' para 
// hacer un .fetch() y recibir los datos que devuelve. Imprimelo mediante un 
// console.log(). Para ello, es necesario que crees un .html y un .js.

// const loadData = async (url="https://api.agify.io?name=michael")=>{
//     try{
//         const respuesta = await fetch(url)
//         const datos = await respuesta.json()
//         data = datos
//         console.log(data)
// }catch (error){
//     console.log(error)
// }
// }
// loadData()


// 1.2 Dado el siguiente javascript y html. Añade la funcionalidad necesaria usando 
// fetch() para hacer una consulta a la api cuando se haga click en el botón, 
// pasando como parametro de la api, el valor del input.

// const baseUrl = 'https://api.nationalize.io';

// let dato 

// const datos = async(name)=>{
//     try{
//         const response = await fetch(`${baseUrl}?name=${name}`)
//         const data = await response.json()
//          dato = data
//         console.log(dato)
//         return datos
//     }catch(error){
//         console.log(error)
//     }
// }

// const button = document.querySelector("button")
// button.addEventListener("click", ()=>{
//     const input = document.querySelector("input").value

//     datos(input)
// })


// 1.3 En base al ejercicio anterior. Crea dinamicamente un elemento por cada petición 
// a la api que diga...'El nombre X tiene un Y porciento de ser de Z' etc etc.
// EJ: El nombre Pepe tiene un 22 porciento de ser de ET.

const baseUrl = 'https://api.nationalize.io';

let dato 

const datos = async(name)=>{
    try{
        const response = await fetch(`${baseUrl}?name=${name}`)
        const data = await response.json()
         dato = data
        console.log(dato)
        return dato
    }catch(error){
        console.log(error)
    }
}

const boton = document.createElement("button")
const ul = document.createElement("ul")
const body = document.querySelector("body")
body.append(ul)
const printData = async (text) =>{
const data = await datos(text)
const {name, country} = data
for (let city of country) {
    const {country_id, probability} = city
    const template = `<li><p>El nombre ${name} tiene un ${probability} porciento de ser de ${country_id} <button class="botonImg">borrar</button></p></li>`
    ul.innerHTML += template
}
}

const botonClass = document.querySelector(".botonImg")
const button = document.querySelector("button")
button.addEventListener("click", ()=>{
    const input = document.querySelector("input").value
    printData(input)

})



// 1.4 En base al ejercicio anterior, crea un botón con el texto 'X' para cada uno 
// de los p que hayas insertado y que si el usuario hace click en este botón 
// eliminemos el parrafo asociado.
