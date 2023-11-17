import { useEffect, useState } from 'react';
import './Chronometer.css';

export const Chronometer = () => {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);

    useEffect(() => {
        let interval = null;
    
        if (timerOn) {
          interval = setInterval(() => {
            setTime((prevTime) => prevTime + 10); // el prevTime es el valor antes de que time cambie
          }, 10); // cada 10 milisegundo llama a setTime
        } else {
          clearInterval(interval);
        }
    
        return () => clearInterval(interval);
      }, [timerOn]); // en el array de dependencias metemos timerOn porque si timerOn cambia, se vuelve a ejecutar el useEffect

  return (
    <div className='Chronometer'>
        <h2>{time}</h2>
        
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>

        <div id="buttons">
        {!timerOn && time === 0 && (
          <button onClick={() => setTimerOn(true)}>GO!</button>
        )}
        {timerOn && <button onClick={() => setTimerOn(false)}>STOP</button>}
        {!timerOn && time > 0 && (
          <button onClick={() => setTime(0)}>RESET</button>
        )}
        {!timerOn && time > 0 && (
          <button onClick={() => setTimerOn(true)}>RESUME</button>
        )}
      </div>
    </div>
  );
};