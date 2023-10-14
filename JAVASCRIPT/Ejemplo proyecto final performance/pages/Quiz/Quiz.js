
let index = 0

const preguntasRespuestas = [{
    "pregunta": "¿Cuál es el primer club de fútbol de la historia?",
    "respuesta1": "Sheffield Football Club",
    "respuesta2": "Independiente de Avellaneda",
    "respuesta3": "Recreativo de Huelva",
    "respuesta4": "Santos FC",
    "correcta" : "respuesta1"
  },
  {
    "pregunta": "¿Cuántos segundos tardó Ricaro Oliveira en marcar el gol más rápido de la historia?",
    "respuesta1": "2.8",
    "respuesta2": "3.5",
    "respuesta3": "5.4",
    "respuesta4": "4.8",
    "correcta" : "respuesta1"
  },
  {
    "pregunta": "¿Cuál de estos futbolistas tiene 3 mundiales?",
    "respuesta1": "Pelé",
    "respuesta2": "Zinedine Zidane",
    "respuesta3": "Leo Messi",
    "respuesta4": "Maradona",
    "correcta" : "respuesta1"
  },
  {
    "pregunta": "¿Qué jugador ha jugado más partidos en la liga española?",
    "respuesta1": "Andoni Zubizarreta",
    "respuesta2": "Joaquín Sánchez",
    "respuesta3": "Raúl González",
    "respuesta4": "Xavi Hernández",
    "correcta" : "respuesta1"
  },
  {
    "pregunta": "La peor selección de fútbol de la historia es San Marino, ¿sabes cuántas victorias ha conseguido hasta hoy en 106 partidos?",
    "respuesta1": "1",
    "respuesta2": "4",
    "respuesta3": "11",
    "respuesta4": "9",
    "correcta" : "respuesta1"
  },
  {
    "pregunta": "¿Quién es el único portero hasta el momento en conseguir el Balón de Oro?",
    "respuesta1": "Oliver Khan",
    "respuesta2": "Gianluigi Buffon",
    "respuesta3": "Iker Casillas",
    "respuesta4": "Ter Stegen",
    "correcta" : "respuesta1"
  },
  {
    "pregunta": "Rogerio Ceni, es el portero con más goles anotados de la historia, ¿sabes cuántos anotó?",
    "respuesta1": "128",
    "respuesta2": "8",
    "respuesta3": "254",
    "respuesta4": "59",
    "correcta" : "respuesta1"
  },
  {
    "pregunta": "¿Cuál es el traspaso más caro de la historia del fútbol?",
    "respuesta1": "Neymar al PSG",
    "respuesta2": "Cristiano Ronaldo al Real Madrid",
    "respuesta3": "Coutinho al Barcelona",
    "respuesta4": "Mbappé al PSG",
    "correcta" : "respuesta1"
  },
  {
    "pregunta": "El Loco Abreu tiene el récord de jugar en más equipos de fútbol diferentes durante un período de 26 años, ¿sabrías decir en cuántos equipos jugó?",
    "respuesta1": "31",
    "respuesta2": "26",
    "respuesta3": "15",
    "respuesta4": "42",
    "correcta" : "respuesta1"
  },
  {
    "pregunta": "¿Cuál es el estadio más antiguo del mundo?",
    "respuesta1": "Bramall Lane",
    "respuesta2": "Hampden Park",
    "respuesta3": "Parque de los Príncipes",
    "respuesta4": "Anfield",
    "correcta" : "respuesta1"
  },
  {
    "pregunta": "¿Qué selección tiene el récord de mayor número de partidos invictos?",
    "respuesta1": "Italia",
    "respuesta2": "Argentina",
    "respuesta3": "España",
    "respuesta4": "Brasil",
    "correcta" : "respuesta1"
  },
  {
    "pregunta": "¿Cuánto pesa un balón de fútbol?",
    "respuesta1": "Entre 410-450 gramos",
    "respuesta2": "Entre 340-390 gramos",
    "respuesta3": "Entre 460-510 gramos",
    "respuesta4": "Entre 550-600 gramos",
    "correcta" : "respuesta1"
  },
  {
    "pregunta": "¿Qué jugador ha disputado más partidos con la selección española?",
    "respuesta1": "Sergio Ramos",
    "respuesta2": "Xavi Hernández",
    "respuesta3": "Iker Casillas",
    "respuesta4": "Carles Puyol",
    "correcta" : "respuesta1"
  },
  {
    "pregunta": "¿Cuál de estos equipos NO tiene una Champions League?",
    "respuesta1": "PSG",
    "respuesta2": "Aston Villa",
    "respuesta3": "Celtic de Glasgow",
    "respuesta4": "Hamburgo",
    "correcta" : "respuesta1"
  },
  {
    "pregunta": "¿A quién nos referimos si hablamos del Rubio de Barakaldo?",
    "respuesta1": "Javier Clemente",
    "respuesta2": "Julen Guerrero",
    "respuesta3": "Xabi Alonso",
    "respuesta4": "Julen Lopetegui",
    "correcta" : "respuesta1"
  },]

  const template = () => `
  <div id="Quiz">
    <h1 id="question">pregunta</h1>
    <button id="r1" class="answer">respuesta1</button>
    <button id="r2" class="answer">respuesta1</button>
    <button id="r3" class="answer">respuesta1</button>
    <button id="r4" class="answer">respuesta1</button>
    <h2 id="solution"></h2>
    <button id="previous" class="navigationButton">ANTERIOR</button>
    <button id="next" class="navigationButton">SIGUIENTE</button>
  </div>
`;

const addEventListeners = () => {
  const navigatePrevious = document.getElementById("previous");
  navigatePrevious.addEventListener("click", () => {
    getPreviousIndex();
    loadQuestion();
  });

  const navigateNext = document.getElementById("next");
  navigateNext.addEventListener("click", () => {
    getNextIndex();
    loadQuestion();
  });

  const respuestaUno = document.getElementById("r1");
  respuestaUno.addEventListener("click", () => {
    checkAnswer("respuesta1")
  });

  const respuestaDos = document.getElementById("r2");
  respuestaDos.addEventListener("click", () => {
    checkAnswer("respuesta2")
  });

  const respuestaTres = document.getElementById("r3");
  respuestaTres.addEventListener("click", () => {
    checkAnswer("respuesta3")
  });

  const respuestaCuatro = document.getElementById("r4");
  respuestaCuatro.addEventListener("click", () => {
    checkAnswer("respuesta4")
  });

};


export const printTemplateQuiz = () => {
  document.querySelector("main").innerHTML = template();
  document.querySelector("nav").style.display = "flex";
  loadQuestion()
  addEventListeners();
  console.log("quiz cargado");
};

const getPreviousIndex = () =>{
  // index == 0 ? 14 : index--; no me funciona con ternarios
  if (index = index == 0){
    index = 14
  }else {
    index--
  }
}

const getNextIndex = () =>{
  // index == 14 ? 0 : index++; no me funciona con ternarios
  if (index = index == 14){
    index = 0
  }else {
    index++
  }
}

const loadQuestion = () => {
  document.getElementById("question").innerText = preguntasRespuestas[index].pregunta
  document.getElementById("r1").innerText = preguntasRespuestas[index].respuesta1
  document.getElementById("r2").innerText = preguntasRespuestas[index].respuesta2
  document.getElementById("r3").innerText = preguntasRespuestas[index].respuesta3
  document.getElementById("r4").innerText = preguntasRespuestas[index].respuesta4
  document.getElementById("solution").innerText = ""
}

const checkAnswer = (answer) => {
  if( answer == preguntasRespuestas[index].correcta){
    document.getElementById("solution").innerText = "CORRECTO!"
  } else {
    document.getElementById("solution").innerText = "INCORRECTO"
  }
}