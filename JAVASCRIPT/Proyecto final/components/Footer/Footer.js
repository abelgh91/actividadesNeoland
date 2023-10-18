import "./Footer.css";
const template = () => `
<h3><span>SOUTH CLUB GAMES by</span> Abel Garcia</h3>
`;

export const PintarFooter = () => {
  document.querySelector("footer").innerHTML = template();
};
