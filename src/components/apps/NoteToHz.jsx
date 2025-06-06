import { useState } from 'react';

const noteFrequencies = {
  'C4': 261.63,
  'D4': 293.66,
  'E4': 329.63,
  'F4': 349.23,
  'G4': 392.00,
  'A4': 440.00,
  'B4': 493.88,
};

export default function NoteToHz() {
  const [note, setNote] = useState('A4');
  const [freq, setFreq] = useState(noteFrequencies[note]);

  const handleChange = (e) => {
    const selectedNote = e.target.value;
    setNote(selectedNote);
    setFreq(noteFrequencies[selectedNote]);
  };

  return (
    <div>
      <h2>Conversor Nota → Frequência (Hz)</h2>
      <select value={note} onChange={handleChange} style={{ background: 'black', color: 'lime', border: '1px solid lime', padding: '0.3rem' }}>
        {Object.keys(noteFrequencies).map(n => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
      <p>Frequência: {freq.toFixed(2)} Hz</p>
    </div>
  );
}