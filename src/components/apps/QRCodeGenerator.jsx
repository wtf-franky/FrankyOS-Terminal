import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!text) {
      setQrDataUrl('');
      return;
    }
    QRCode.toDataURL(text, { errorCorrectionLevel: 'H' })
      .then(url => setQrDataUrl(url))
      .catch(() => setQrDataUrl(''));
  }, [text]);

  return (
    <div style={{ color: 'lime', fontFamily: 'monospace' }}>
      <h2>Gerador de QR Code</h2>
      <label>
        Texto ou URL: <br />
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="https://example.com"
          style={{ width: '100%', background: 'black', color: 'lime', border: '1px solid lime', padding: '0.25rem' }}
        />
      </label>
      <div style={{ marginTop: '1rem' }}>
        {qrDataUrl ? (
          <img src={qrDataUrl} alt="QR Code" style={{ width: 200, height: 200 }} />
        ) : (
          <p>Insira texto para gerar QR Code.</p>
        )}
      </div>
    </div>
  );
}