// src/components/apps/AsciiGenerator.jsx
import { useState } from 'react';

export default function AsciiGenerator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  // Simples "ASCII art": converte letras para maiúsculas e insere linhas entre letras
  // Aqui podes depois evoluir para algo mais complexo se quiseres
  const generateAscii = () => {
    if (!input.trim()) {
      setOutput('');
      return;
    }
    // Exemplo: transforma cada letra em letra maiúscula com espaço entre
    const ascii = input
      .toUpperCase()
      .split('')
      .map((ch) => {
        if (ch === ' ') return '   ';
        return ch + ' ';
      })
      .join('\n');
    setOutput(ascii);
  };

  return (
    <div style={{ color: 'lime', fontFamily: 'monospace' }}>
      <h2>Gerador de ASCII Simples</h2>
      <textarea
        rows={3}
        style={{
          background: 'black',
          color: 'lime',
          width: '100%',
          fontFamily: 'monospace',
          border: '1px solid lime',
          padding: '0.5rem',
          resize: 'none',
        }}
        placeholder="Escreve aqui o texto para converter em ASCII"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={generateAscii}
        style={{
          marginTop: '0.5rem',
          background: 'lime',
          color: 'black',
          border: 'none',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Gerar ASCII
      </button>
      <pre
        style={{
          marginTop: '1rem',
          background: 'black',
          color: 'lime',
          padding: '1rem',
          minHeight: '100px',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          border: '1px solid lime',
        }}
      >
        {output}
      </pre>
    </div>
  );
}