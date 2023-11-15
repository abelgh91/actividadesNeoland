import './Languages.css'

export const Languages = ({language, wrlevel, splevel}) => {
  return (
    <div>
        <p>{language}</p>
        <p>{wrlevel}</p>
        <p>{splevel}</p>
    </div>
  )
};