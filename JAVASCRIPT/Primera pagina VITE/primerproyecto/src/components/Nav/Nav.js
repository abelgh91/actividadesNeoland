import "./Nav.css";

const template = () => `
  <nav>
    <ul>
      <li>HOME</li>
      <li>PROFILE</li>
      <li>POKEDEX</li>
    </ul>
  </nav>
`;

export const printTemplateNav = () => {
  document.getElementById("containerNav").innerHTML = template();
};