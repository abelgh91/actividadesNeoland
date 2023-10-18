
import "./Quiz.css"
let index = 0;
let score = 0;
let preguntasRespondidas = [];

const preguntasRespuestas = [{
    "pregunta": "1.¿Cuál es el primer club de fútbol de la historia?",
    "respuesta1": "Recreativo de Huelva",
    "respuesta2": "Independiente de Avellaneda",
    "respuesta3": "Sheffield Football Club",
    "respuesta4": "Santos FC",
    "correcta" : "respuesta3"
  },
  {
    "pregunta": "2.¿Cuántos segundos tardó Ricaro Oliveira en marcar el gol más rápido de la historia?",
    "respuesta1": "2.8",
    "respuesta2": "3.5",
    "respuesta3": "5.4",
    "respuesta4": "4.8",
    "correcta" : "respuesta1"
  },
  {
    "pregunta": "3.¿Cuál de estos futbolistas tiene 3 mundiales?",
    "respuesta1": "Zinedine Zidane",
    "respuesta2": "Pelé",
    "respuesta3": "Leo Messi",
    "respuesta4": "Maradona",
    "correcta" : "respuesta2"
  },
  {
    "pregunta": "4.¿Qué jugador ha jugado más partidos en la liga española?",
    "respuesta1": "Xavi Hernández",
    "respuesta2": "Joaquín Sánchez",
    "respuesta3": "Raúl González",
    "respuesta4": "Andoni Zubizarreta",
    "correcta" : "respuesta4"
  },
  {
    "pregunta": "5.¿Sabes cuántas victorias ha conseguido San Marino hasta hoy en 106 partidos?",
    "respuesta1": "11",
    "respuesta2": "4",
    "respuesta3": "1",
    "respuesta4": "9",
    "correcta" : "respuesta3"
  },
  {
    "pregunta": "6.¿Quién es el único portero hasta el momento en conseguir el Balón de Oro?",
    "respuesta1": "Gianluigi Buffon",
    "respuesta2": "Oliver Khan",
    "respuesta3": "Iker Casillas",
    "respuesta4": "Ter Stegen",
    "correcta" : "respuesta2"
  },
  {
    "pregunta": "7.Rogerio Ceni, es el portero con más goles anotados de la historia, ¿sabes cuántos anotó?",
    "respuesta1": "59",
    "respuesta2": "8",
    "respuesta3": "254",
    "respuesta4": "128",
    "correcta" : "respuesta4"
  },
  {
    "pregunta": "8.¿Cuál es el traspaso más caro de la historia del fútbol?",
    "respuesta1": "Cristiano Ronaldo al Real Madrid",
    "respuesta2": "Neymar al PSG",
    "respuesta3": "Coutinho al Barcelona",
    "respuesta4": "Mbappé al Real Madrid",
    "correcta" : "respuesta2"
  },
  {
    "pregunta": "9.¿Sabrías decir en cuántos equipos jugó el Loco Abreu en 26 años?",
    "respuesta1": "31",
    "respuesta2": "26",
    "respuesta3": "15",
    "respuesta4": "42",
    "correcta" : "respuesta1"
  },
  {
    "pregunta": "10.¿Cuál es el estadio más antiguo del mundo?",
    "respuesta1": "Parque de los Príncipes",
    "respuesta2": "Hampden Park",
    "respuesta3": "Bramall Lane",
    "respuesta4": "Anfield",
    "correcta" : "respuesta3"
  },
  {
    "pregunta": "11.¿Qué selección tiene el récord de mayor número de partidos invictos?",
    "respuesta1": "España",
    "respuesta2": "Argentina",
    "respuesta3": "Italia",
    "respuesta4": "Brasil",
    "correcta" : "respuesta3"
  },
  {
    "pregunta": "12.¿Cuánto pesa un balón de fútbol?",
    "respuesta1": "Entre 550-600 gramos",
    "respuesta2": "Entre 340-390 gramos",
    "respuesta3": "Entre 460-510 gramos",
    "respuesta4": "Entre 410-450 gramos",
    "correcta" : "respuesta4"
  },
  {
    "pregunta": "13.¿Qué jugador ha disputado más partidos con la selección española?",
    "respuesta1": "Sergio Ramos",
    "respuesta2": "Xavi Hernández",
    "respuesta3": "Iker Casillas",
    "respuesta4": "Carles Puyol",
    "correcta" : "respuesta1"
  },
  {
    "pregunta": "14.¿Cuál de estos equipos NO tiene una Champions League?",
    "respuesta1": "Hamburgo",
    "respuesta2": "Aston Villa",
    "respuesta3": "Celtic de Glasgow",
    "respuesta4": "PSG",
    "correcta" : "respuesta4"
  },
  {
    "pregunta": "15.¿A quién nos referimos si hablamos del Rubio de Barakaldo?",
    "respuesta1": "Xabi Alonso",
    "respuesta2": "Julen Guerrero",
    "respuesta3": "Javier Clemente",
    "respuesta4": "Julen Lopetegui",
    "correcta" : "respuesta3"
  },]

  const template = () => `
  <div class="containerQuiz">
    <div class="score">Score: <span id="score">0</span></div>
    <div id="Quiz">
      <h1 id="question">pregunta</h1>
      <button id="r1" class="answer answer-btn incorrecta" data-answer="respuesta1">respuesta1</button>
      <button id="r2" class="answer answer-btn incorrecta" data-answer="respuesta2">respuesta2</button>
      <button id="r3" class="answer answer-btn incorrecta" data-answer="respuesta3">respuesta3</button>
      <button id="r4" class="answer answer-btn incorrecta" data-answer="respuesta4">respuesta4</button>
      <div class="navBotones"><h2 id="solution"></h2>
      <button id="previous" class="navigationButton">ANTERIOR</button>
      <button id="next" class="navigationButton">SIGUIENTE</button></div>
    </div>
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
    checkAnswer("respuesta1");
  });

  const respuestaDos = document.getElementById("r2");
  respuestaDos.addEventListener("click", () => {
    checkAnswer("respuesta2");
  });

  const respuestaTres = document.getElementById("r3");
  respuestaTres.addEventListener("click", () => {
    checkAnswer("respuesta3");
  });

  const respuestaCuatro = document.getElementById("r4");
  respuestaCuatro.addEventListener("click", () => {
    checkAnswer("respuesta4");
  });
};

export const PintarQuiz = () => {
  index = 0;
  preguntasRespondidas = [];
  document.querySelector("main").innerHTML = template();
  document.querySelector("nav").style.display = "flex";
  loadQuestion();
  const navigatePrevious = document.getElementById("previous");
  navigatePrevious.style.display = "none";
  navigatePrevious.style.opacity = "0.5";
  addEventListeners();
  congratulationsTemplate();
};

const getPreviousIndex = () => {
  console.log("index en el previus", index);
  if (index >= 1) {
    index--;
  }

  if (index === 0) {
    const navigatePrevious = document.getElementById("previous");
    navigatePrevious.style.display = "none";
  }
};

const getNextIndex = () => {
  index++;
  if (index === 0) {
    const navigatePrevious = document.getElementById("previous");
    navigatePrevious.style.display = "none";
  }
  if (index > 0) {
    const navigatePrevious = document.getElementById("previous");
    navigatePrevious.style.display = "flex";
  }
};

const congratulationsTemplate = (score) => `
<div id="Enhorabuena">
<p>Enhorabuena!! Has respondido ${score} de 15 preguntas correctamente</p>
<button id="restartButton">Volver a jugar</button>
</div>
`;

const loadQuestion = () => {

  if (index >= preguntasRespuestas.length) {
    document.querySelector("#Quiz").style.display = "none";
    const scoreElement = document.querySelector(".score");
    const congratulationsElement = document.createElement("div");
    congratulationsElement.innerHTML = congratulationsTemplate(score);
    scoreElement.parentElement.appendChild(congratulationsElement);

    const restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", () => {
      document.querySelector("#Quiz").style.display = "flex";
      score = 0;
      document.getElementById("score").innerText = score;
      index = 0;
      preguntasRespondidas = [];
      congratulationsElement.remove();
      PintarQuiz();
    });
    return;
  }

  let buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach((button) => {
    button.style.backgroundColor = "";
    button.removeAttribute("disabled");
  });

  document.getElementById("question").innerText =
    preguntasRespuestas[index].pregunta;
  document.getElementById("r1").innerText =
    preguntasRespuestas[index].respuesta1;
  document.getElementById("r2").innerText =
    preguntasRespuestas[index].respuesta2;
  document.getElementById("r3").innerText =
    preguntasRespuestas[index].respuesta3;
  document.getElementById("r4").innerText =
    preguntasRespuestas[index].respuesta4;
  document.getElementById("solution").innerText = "";
  preguntasRespondidas.push(index);
};

const checkAnswer = (answer) => {
  const respuestaCorrecta = preguntasRespuestas[index].correcta;
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach((button) => {
    button.setAttribute("disabled", true);
    if (button.getAttribute("data-answer") === respuestaCorrecta) {
      button.style.backgroundColor = "green";
    }
    if (button.getAttribute("data-answer") === answer) {
      if (answer === respuestaCorrecta) {
        button.style.backgroundColor = "green";
      } else {
        button.style.backgroundColor = "red";
      }
    }
  });

  if (answer === respuestaCorrecta) {
    document.getElementById("solution").innerText = "CORRECTO!";
    document.getElementById("solution").style.color = "green";
    score++;
    document.getElementById("score").innerText = score;
  } else {
    document.getElementById("solution").innerText = "INCORRECTO";
    document.getElementById("solution").style.color = "red";
  }
};
congratulationsTemplate();

console.log(preguntasRespondidas);

