import './More.css';

export const More = ({languages, habilities, volunteer}) => {
  return (
    <div className='more'>
        <div>
            <h2>{languages.language}</h2>
            <h2>{languages.wrlevel}</h2>
            <h2>{languages.splevel}</h2>
        </div>
        <div>
            <h2>{habilities}</h2>
        </div>
        <div className='volunteer card'>
        {volunteer.map((item) => {
          return (
            <div key={JSON.stringify(item)}>
              <p className="name">{item.name}</p>
              <p>{item.where}</p>
              <p>{item.description}</p>
            </div>
          );
        })}
        </div>
    </div>
  )
};