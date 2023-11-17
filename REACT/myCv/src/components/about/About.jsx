import { CV } from '../../cv/Cv';
import './About.css';


export const About = () => {
    const aboutme = CV.abel.aboutMe;
  return (
    <div className='abel'>
        {aboutme.map((item) => (
        <div key={JSON.stringify}>
           <p>{item.info}</p>
        </div>
        ))}
    </div>
  )
};