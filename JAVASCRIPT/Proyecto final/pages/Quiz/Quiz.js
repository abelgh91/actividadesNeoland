
import { getNextIndex, getPreviousIndex } from "../../components/ButtonQuiz/buttonQuiz";
import "./Quiz.css"
import preguntasRespuestas from "./questions";


let index = 0;
let score = 0;
let preguntasRespondidas = [];

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