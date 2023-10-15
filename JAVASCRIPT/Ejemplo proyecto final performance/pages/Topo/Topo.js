import "./Topo.css"

const squares = document.querySelectorAll(".square")
const mole = document.querySelector(".mole")  // no entiendo por que lo crea si no esta en el template (se crea en html pero luego se borra)
const timeLeft = document.getElementById("#time-left")
const score = document.getElementById("score")

let result = 0
let hitPosition;
let currentTime = 60;
let timerId = null;  

const template = () => `
  <div id="Topo">
  <h1>WHAC A MOLE</h1>
  <h2>Your score:</h2>
  <h2 id="score">0</h2>

  <h2>Time Left:</h2>
  <h2 id="time-left">60</h2>

  <div class="grid">
    <div class="square" id="1"></div>
    <div class="square" id="2"></div>
    <div class="square" id="3"></div>
    <div class="square" id="4"></div>
    <div class="square" id="5"></div>
    <div class="square" id="6"></div>
    <div class="square" id="7"></div>
    <div class="square" id="8"></div>
    <div class="square" id="9"></div>
  </div>
  </div>
`;

function randomSquare () {
  squares.forEach(square => {
    square.classList.remove("mole")
  })

  let randomSquare = squares[Math.floor(Math.random() * 9)]
  // randomSquare.classList.add("mole");  // da error

  // hitPosition = randomSquare.id; // da error
}

squares.forEach(square => {
  square.addEventListener("click", () => {
    if(square.id == hitPosition){
      result++;
      score.textContent = result;
      hitPosition = null
    }
  })
})

function moveMole () {
  timerId = setInterval(randomSquare, 500);
}

moveMole();

function countDown() {
  currentTime--;
  // timeLeft.textContent = currentTime;  // da error

  if(currentTime == 0) {
    clearInterval(countDownTimerId) // no la entiendo bien
    clearInterval(timerId);
    alert("GAME OVER! Your score is: " + result)
  }
}

let countDownTimer = setInterval(countDown, 1000); // el contador no hace la cuenta atras




export const printTemplateTopo = () => {
  document.querySelector("main").innerHTML = template();
  document.querySelector("nav").style.display = "flex";
  // addEventListeners();
  console.log("topo cargado");
};

