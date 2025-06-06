import { useState } from 'react';

export default function PasswordValidator() {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);

  const validatePassword = (pw) => {
    // Garantir que pw é string (fallback para '')
    pw = pw || '';

    const lengthOk = pw.length >= 8;
    const hasUpper = /[A-Z]/.test(pw);
    const hasLower = /[a-z]/.test(pw);
    const hasNumber = /\d/.test(pw);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pw);

    const score =
      [lengthOk, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

    let strength = 'Muito Fraca';
    if (score >= 4) strength = 'Forte';
    else if (score === 3) strength = 'Média';
    else if (score === 2) strength = 'Fraca';

    return { strength, lengthOk, hasUpper, hasLower, hasNumber, hasSpecial };
  };

  const handleChange = (e) => {
    const pw = e.target.value;
    setPassword(pw);
    if (!pw) setResult(null);
    else setResult(validatePassword(pw));
  };

  return (
    <div style={{ color: 'lime', fontFamily: 'monospace' }}>
      <h2>Validador de Senhas</h2>
      <input
        type="password"
        placeholder="Escreve a tua senha aqui"
        value={password}
        onChange={handleChange}
        style={{
          background: 'black',
          color: 'lime',
          border: '1px solid lime',
          padding: '0.5rem',
          fontFamily: 'monospace',
          width: '100%',
        }}
      />
      {result && (
        <div style={{ marginTop: '1rem' }}>
          <p>
            <strong>Força da Senha:</strong> {result.strength}
          </p>
          <ul>
            <li style={{ color: result.lengthOk ? 'lime' : 'red' }}>
              Mínimo 8 caracteres
            </li>
            <li style={{ color: result.hasUpper ? 'lime' : 'red' }}>
              Uma letra maiúscula
            </li>
            <li style={{ color: result.hasLower ? 'lime' : 'red' }}>
              Uma letra minúscula
            </li>
            <li style={{ color: result.hasNumber ? 'lime' : 'red' }}>
              Um número
            </li>
            <li style={{ color: result.hasSpecial ? 'lime' : 'red' }}>
              Um caractere especial (!@#$%^&*(),.?":{'{}'}|&lt;&gt;)
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}