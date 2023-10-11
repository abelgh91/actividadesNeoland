// 1.1 Basandote en el array siguiente, crea una lista ul > li 
// dinámicamente en el html que imprima cada uno de los paises.
const country = ['Japón', 'Nicaragua', 'Suiza', 'Australia', 'Venezuela'];

const body = document.querySelector("body");
const ul = document.createElement("ul");
body.appendChild(ul)

for(let i = 0; i < country.length; i++){
    const li = document.createElement("li")
    li.textContent = country[i]
    ul.appendChild(li)
}


// 1.2 Elimina el elemento que tenga la clase .fn-remove-me.

let eliminar = document.querySelector(".fn-remove-me");
eliminar.remove("fn-remove-me");

//1.3 Utiliza el array para crear dinamicamente una lista ul > li de elementos 
// en el div de html con el atributo data-function="printHere".
const cars = ['Mazda 6', 'Ford fiesta', 'Audi A4', 'Toyota corola'];

const div = document.querySelector("[data-function=printHere]");
const ulList = document.createElement("ul");
div.appendChild(ulList)


for(let i = 0; i < cars.length; i++) {
    const liList = document.createElement("li");
    div.appendChild(liList);
    liList.textContent = `${cars[i]}`;
}

//1.4 Crea dinamicamente en el html una serie de divs que contenga un elemento 
// h4 para el titulo y otro elemento img para la imagen.
const countries = [
	{title: 'Random title', imgUrl: 'https://picsum.photos/300/200?random=1'}, 
	{title: 'Random title', imgUrl: 'https://picsum.photos/300/200?random=2'},
	{title: 'Random title', imgUrl: 'https://picsum.photos/300/200?random=3'},
	{title: 'Random title', imgUrl: 'https://picsum.photos/300/200?random=4'},
	{title: 'Random title', imgUrl: 'https://picsum.photos/300/200?random=5'}
];

const cuerpo = document.querySelector("body");

for (let i = 0; i < countries.length; i++) {
    const divs = 
    `<div>
    <h4>${countries[i].title}</h4>
    <img src="${countries[i].imgUrl}" alt="imagen random"/>
    <button class="botonImg">borrar imagen</button>
    </div>`
    body.innerHTML += divs
}

// 1.5 Basandote en el ejercicio anterior. Crea un botón que elimine el último 
// elemento de la serie de divs.

const boddy = document.querySelector("body");
const button = `<button id="borrarElemento">Borrar ultimo elemento</button>`;
body.innerHTML += button

const buttonById = document.getElementById("borrarElemento");
const arrays = document.querySelectorAll("div")
console.log(arrays)
buttonById.addEventListener("click", (event)=> {
 arrays[5].remove();
});

//1.6 Basandote en el ejercicio anterior. Crea un botón para cada uno de los 
// divs que elimine ese mismo elemento del html.

let botones = document.querySelectorAll(".botonImg");
botones.forEach((button)=> {
    button.addEventListener("click", ()=>{
        button.parentElement.remove()
    })
})
