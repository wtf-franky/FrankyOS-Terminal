import { useState } from 'react';

const DICE_TYPES = [4, 6, 8, 10, 12, 20, 100];

export default function DiceRoller() {
  const [dice, setDice] = useState(6);
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState([]);

  const rollDice = () => {
    const rolls = [];
    for (let i = 0; i < quantity; i++) {
      rolls.push(Math.floor(Math.random() * dice) + 1);
    }
    setResults(rolls);
  };

  return (
    <div style={{ color: 'lime', fontFamily: 'monospace' }}>
      <h2>Dice Roller</h2>
      <label>
        Tipo de dado: 
        <select
          value={dice}
          onChange={e => setDice(Number(e.target.value))}
          style={{ marginLeft: '0.5rem', background: 'black', color: 'lime', border: '1px solid lime' }}
        >
          {DICE_TYPES.map(d => (
            <option key={d} value={d}>d{d}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Quantidade: 
        <input
          type="number"
          min="1"
          max="20"
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          style={{ marginLeft: '0.5rem', width: '3rem', background: 'black', color: 'lime', border: '1px solid lime' }}
        />
      </label>
      <br />
      <button
        onClick={rollDice}
        style={{ marginTop: '1rem', background: 'lime', color: 'black', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }}
      >
        Rolar
      </button>

      {results.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <strong>Resultados:</strong> {results.join(', ')}<br />
          <strong>Total:</strong> {results.reduce((a, b) => a + b, 0)}
        </div>
      )}
    </div>
  );
}