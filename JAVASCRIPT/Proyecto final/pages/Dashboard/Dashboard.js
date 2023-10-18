import { getData, getIntervalTopo } from "../../global/state/globalState";
import { getInfo, RenderControl } from "../../utils";
import "./Dashboard.css";


const template = () => `
  <div id="containerDashboard">
    <ul>
      <li>
        <figure id="navigatePokemon">
          <img
            src="https://res.cloudinary.com/dqlvldxwc/image/upload/v1697480701/2_h15s7d.png"
            alt="go to page pokemon"
          />
          <h2>POKEMON</h2>
        </figure>
      </li>
      <li>
        <figure id="navigateWackaTopo">
          <img
            src="https://res.cloudinary.com/dqlvldxwc/image/upload/v1697480703/1_b1ehte.png"
            alt=" go to wacka topo game"
          />
          <h2>WACKA TOPO</h2>
        </figure>
      </li>
      <li>
        <figure id="navigateQuiz">
          <img
            src="https://res.cloudinary.com/dqlvldxwc/image/upload/v1697480702/3_vpsmgg.png"
            alt="go to Quiz game"
          />
          <h2>QUIZ FÚTBOL</h2>
        </figure>
      </li>
    </ul>
  </div>
`;

const addEventListeners = () => {
  const navigatePokemon = document.getElementById("navigatePokemon");
  navigatePokemon.addEventListener("click", () => {
    RenderControl("Pokemon");
  });

  const navigateQuiz = document.getElementById("navigateQuiz");
  navigateQuiz.addEventListener("click", () => {
    RenderControl("Quiz");
  });

  const navigateWackaTopo = document.getElementById("navigateWackaTopo");
  navigateWackaTopo.addEventListener("click", () => {
    RenderControl("Topo");
  });
};

export const PintarDashboard = () => {
  document.querySelector("main").innerHTML = template();
  document.querySelector("nav").style.display = "flex";
  addEventListeners();
  console.log(getData());
  getInfo();
  const idInterval = getIntervalTopo();
  console.log(`id`, idInterval)
  clearInterval(idInterval.topo)
  clearInterval(idInterval.topoTime)
};

