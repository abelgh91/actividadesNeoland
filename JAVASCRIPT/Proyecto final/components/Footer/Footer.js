import "./Footer.css";
const template = () => `
<h3><span>SOUTH CLUB GAMES by</span> Abel Garcia</h3>
<a href="https://www.youtube.com/watch?v=5gbzYwLQ9K0&t=573s/" target="_blank">
<button class="footerbtn" type="submit" value"youtube"><img id ="imgfooter" src="https://res.cloudinary.com/dqlvldxwc/image/upload/v1697729674/vecteezy_youtube-logo-png-youtube-logo-transparent-png-youtube-icon_23986704_292_s8jb2e.png" alt="youtube"/></button>
</a>
`;

export const PintarFooter = () => {
  document.querySelector("footer").innerHTML = template();
};
