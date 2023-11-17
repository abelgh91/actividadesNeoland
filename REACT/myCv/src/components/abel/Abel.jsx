import './Abel.css';

export const Abel = ({abel}) => {
  return (
    <div className='abel'>
        <img src={abel.image} alt=""/>
        <div className='card'>
            <h2>
                {abel.name} {abel.surname}
            </h2>
            <p>{abel.city}</p>
            <p>{abel.birthDate}</p>
            <p>
                <a href={'mailto:' + abel.mail}>abel@abel.com</a>
            </p>
            <p>{abel.phone}</p>
            <p>
                <a href={abel.gitHub}>GitHub</a>
            </p>
        </div>
    </div>
  )
};