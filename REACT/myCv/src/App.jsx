import { useState } from 'react'
import './App.css'
import { CV } from './cv/Cv';
import { Abel, About, Education, Experience, More } from './components';

const {abel, education, experience, languages, habilities, volunteer} = CV;

export const App=()=> {
  const [showEducation, setShowEducation] = useState(true);

  return (
    <>
    <div className='App'>
      <Abel abel={abel}/>
      <About abel={abel}/>
      <button
              className="custom-btn btn-4"
              onClick={() => setShowEducation(true)}
            >
              Education
            </button>
            <button
              className="custom-btn btn-4"
              onClick={() => setShowEducation(false)}
            >
              Experience
            </button> 
            <div>
        {showEducation ? (
          <Education education={education} />
        ) : (
          <Experience experience={experience} />
        )}
      </div>
      <More languages={languages} habilities={habilities} volunteer={volunteer}/>
    </div>
    </>
  )
};