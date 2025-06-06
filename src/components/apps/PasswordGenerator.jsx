import { useState } from 'react';

export default function PasswordGenerator({ translations = {} }) {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [password, setPassword] = useState('');

  const charsetLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charsetNumbers = '0123456789';
  const charsetSpecial = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  const generatePassword = () => {
    let charset = charsetLetters;
    if (includeNumbers) charset += charsetNumbers;
    if (includeSpecial) charset += charsetSpecial;

    if (length <= 0 || !charset) {
      setPassword('');
      return;
    }

    let retVal = '';
    for (let i = 0; i < length; i++) {
      retVal += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(retVal);
  };

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password)
      .then(() => alert(translations.copied || 'Password copied to clipboard!'))
      .catch(() => alert(translations.copyFailed || 'Failed to copy password.'));
  };

  return (
    <div style={{ fontFamily: 'monospace', color: 'lime' }}>
      <h2>{translations.title || 'Generate Password'}</h2>

      <label>
        {translations.lengthLabel || 'Length:'}{' '}
        <input
          type="number"
          min="1"
          max="64"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          style={{
            background: 'black',
            color: 'lime',
            border: '1px solid lime',
            width: '3.5rem',
            fontFamily: 'monospace',
          }}
        />
      </label>
      <br />

      <label>
        <input
          type="checkbox"
          checked={includeNumbers}
          onChange={() => setIncludeNumbers(!includeNumbers)}
        />{' '}
        {translations.includeNumbers || 'Include numbers'}
      </label>
      <br />

      <label>
        <input
          type="checkbox"
          checked={includeSpecial}
          onChange={() => setIncludeSpecial(!includeSpecial)}
        />{' '}
        {translations.includeSpecial || 'Include special characters'}
      </label>
      <br />

      <button
        onClick={generatePassword}
        style={{
          background: 'black',
          color: 'lime',
          border: '1px solid lime',
          padding: '0.4rem 1rem',
          cursor: 'pointer',
          fontFamily: 'monospace',
          marginTop: '0.5rem',
        }}
      >
        {translations.generate || 'Generate Password'}
      </button>

      {password && (
        <p style={{ marginTop: '1rem' }}>
          <code
            style={{
              background: '#222',
              padding: '0.3rem 0.6rem',
              borderRadius: '4px',
              userSelect: 'all',
            }}
          >
            {password}
          </code>{' '}
          <button
            onClick={copyToClipboard}
            style={{
              background: 'black',
              color: 'lime',
              border: '1px solid lime',
              padding: '0.3rem 0.7rem',
              cursor: 'pointer',
              fontFamily: 'monospace',
              marginLeft: '0.5rem',
            }}
          >
            {translations.copy || 'Copy'}
          </button>
        </p>
      )}
    </div>
  );
}