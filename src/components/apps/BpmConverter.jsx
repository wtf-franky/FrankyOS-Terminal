import { useState } from 'react';

export default function BpmConverter() {
  const [bpm, setBpm] = useState(120);
  const [unit, setUnit] = useState('ms');

  const ms = 60000 / bpm;
  const seconds = ms / 1000;

  return (
    <div>
      <h2>Conversor BPM → ms / segundos</h2>
      <input 
        type="number" 
        min="1" 
        value={bpm} 
        onChange={e => setBpm(Number(e.target.value))} 
        style={{ background: 'black', color: 'lime', border: '1px solid lime', padding: '0.3rem', width: '80px' }}
      />
      <select value={unit} onChange={e => setUnit(e.target.value)} style={{ marginLeft: '0.5rem', background: 'black', color: 'lime', border: '1px solid lime', padding: '0.3rem' }}>
        <option value="ms">ms</option>
        <option value="s">segundos</option>
      </select>
      <p>
        Resultado: {unit === 'ms' ? ms.toFixed(2) : seconds.toFixed(2)} {unit}
      </p>
    </div>
  );
}