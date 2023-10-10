// 2.1 Inserta dinamicamente en un html un div vacio con javascript.

const bodyy = document.querySelector("body")
const newDiv = document.createElement("div");
bodyy.appendChild(newDiv)

// 2.2 Inserta dinamicamente en un html un div que contenga una p con javascript.

// const body = document.querySelector("body");
// const div = document.createElement("div");
const p = document.createElement("p");
body.appendChild(div);
div.appendChild(p);

// 2.3 Inserta dinamicamente en un html un div que contenga 6 p utilizando un loop con javascript.

// const body = document.querySelector("body");
const div = document.createElement("div");
body.appendChild(div);

for (let i = 0; i <= 6; i++) {
    const parrafos = document.createElement("p");
    div.appendChild(parrafos);
}

// 2.4 Inserta dinamicamente con javascript en un html una p con el texto 'Soy dinámico!'

    const body = document.querySelector("body");
    let nuevoParrafo = document.createElement("p");
    nuevoParrafo.textContent = "Soy dinamico";

    body.appendChild(nuevoParrafo)

// 2.5 Inserta en el h2 con la clase .fn-insert-here el texto 'Wubba Lubba dub dub'.

let texto = document.querySelector('h2.fn-insert-here');
texto.textContent = 'Wubba Lubba dub dub';

// 2.6 Basandote en el siguiente array crea una lista ul > li con los textos del array.

const apps = ['Facebook', 'Netflix', 'Instagram', 'Snapchat', 'Twitter'];
const insertArray = document.querySelector('body');
const ulList = document.createElement("ul");

apps.forEach(app => {
    const liElement = document.createElement('li');
    liElement.textContent = app;
    ulList.appendChild(liElement);
  });

    insertArray.appendChild(ulList);

// 2.7 Elimina todos los nodos que tengan la clase .fn-remove-me

let eliminados = document.querySelectorAll(`.fn-remove-me`);
for (i = 0; i < eliminados.length; i++){
    eliminados[i].remove()
}

// 2.8 Inserta una p con el texto 'Voy en medio!' entre los dos div. 
// 	Recuerda que no solo puedes insertar elementos con .appendChild.

    const modificado = document.getElementById('modificado')
    modificado.insertAdjacentHTML("afterend", "<p>voy en medio</p>")
    
// 2.9 Inserta p con el texto 'Voy dentro!', dentro de todos los div con la clase .fn-insert-here

const dentro = document.querySelectorAll(".fn-insert-here")
const parrafo = "<p>voy dentro!</p>"
for (i = 0; i < dentro.length; i++){
    dentro[i].insertAdjacentHTML("beforeend", parrafo)
};


