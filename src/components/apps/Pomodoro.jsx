import { useState, useEffect, useRef } from 'react';

export default function Pomodoro() {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    setSecondsLeft(workMinutes * 60);
  }, [workMinutes]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev === 0) {
            if (isWorkTime) {
              setIsWorkTime(false);
              return breakMinutes * 60;
            } else {
              setIsWorkTime(true);
              return workMinutes * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isWorkTime, breakMinutes, workMinutes]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  };

  return (
    <div>
      <h2>Cronómetro Pomodoro</h2>
      <div>
        <label>
          Trabalho (min):
          <input
            type="number"
            min="1"
            value={workMinutes}
            onChange={e => setWorkMinutes(Number(e.target.value))}
            style={{ background: 'black', color: 'lime', border: '1px solid lime', marginLeft: '0.5rem', width: '50px' }}
          />
        </label>
      </div>
      <div>
        <label>
          Pausa (min):
          <input
            type="number"
            min="1"
            value={breakMinutes}
            onChange={e => setBreakMinutes(Number(e.target.value))}
            style={{ background: 'black', color: 'lime', border: '1px solid lime', marginLeft: '0.5rem', width: '50px' }}
          />
        </label>
      </div>
      <div style={{ fontSize: '3rem', margin: '1rem 0' }}>
        {formatTime(secondsLeft)}
      </div>
      <button onClick={() => setIsRunning(!isRunning)} style={{ marginRight: '1rem' }}>
        {isRunning ? 'Pausar' : 'Iniciar'}
      </button>
      <button onClick={() => {
        setIsRunning(false);
        setIsWorkTime(true);
        setSecondsLeft(workMinutes * 60);
      }}>
        Reset
      </button>
      <p>{isWorkTime ? 'Tempo de trabalho' : 'Pausa'}</p>
    </div>
  );
}