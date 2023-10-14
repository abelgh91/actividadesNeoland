import "./Footer.css";
const template = () => `
<h3><span> SouthClub </span> Entertainment</h3>
`;

export const PrintTemplateFooter = () => {
  document.querySelector("footer").innerHTML = template();
};