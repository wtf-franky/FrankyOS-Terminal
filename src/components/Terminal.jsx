import { useState, useRef, useEffect } from 'react';
import Portfolio from './apps/Portfolio';
import Timer from './apps/Timer';
import Checklist from './apps/Checklist';
import NoteToHz from './apps/NoteToHz';
import BpmConverter from './apps/BpmConverter';
import WorldClock from './apps/WorldClock';
import Pomodoro from './apps/Pomodoro';
import QRCodeGenerator from './apps/QRCodeGenerator';
import AsciiGenerator from './apps/AsciiGenerator';
import Weather from './apps/Weather';
import PasswordGenerator from './apps/PasswordGenerator';
import PasswordValidator from './apps/PasswordValidator';

import { translations } from './translations';
import { useLanguage } from './LanguageContext';

const COMMANDS = ['help', 'run', 'clear', 'exit', 'translate'];

const APPS = [
  'portfolio',
  'timer',
  'checklist',
  'notetohz',
  'bpm',
  'clock',
  'pomodoro',
  'qrcode',
  'ascii',
  'weather',
  'pass-gen',
  'pass-check',
  'value' // easter egg
];

export default function Terminal() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language] || translations.en;

  const [lines, setLines] = useState([t.welcome, t.help]);
  const [input, setInput] = useState('');
  const [activeApp, setActiveApp] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setLines([translations[language].welcome, translations[language].help]);
  }, [language]);

  const handleAutoComplete = () => {
    if (!input) return;
    const parts = input.trim().split(' ');
    if (parts.length === 1) {
      const match = COMMANDS.find(cmd => cmd.startsWith(parts[0]));
      if (match) setInput(match + ' ');
    } else if (parts.length === 2 && parts[0] === 'run') {
      const match = APPS.find(app => app.startsWith(parts[1].toLowerCase()));
      if (match) setInput(`run ${match} `);
    }
  };

  const handleCommand = (command) => {
    const args = command.trim().split(' ');
    const cmd = args[0].toLowerCase();
    const param = args[1]?.toLowerCase();

    if (cmd === 'run' && param === 'value') {
      window.open('https://www.valuemusic.pt/', '_blank');
      return ['Redirecting to https://www.valuemusic.pt/...'];
    }

    switch (cmd) {
      case 'help':
        return t.helpCommand;

      case 'clear':
        setLines([]);
        return [];

      case 'exit':
        if (activeApp) {
          setActiveApp(null);
          return [t.appClosed];
        } else {
          return [t.noActiveApp];
        }

      case 'run':
        if (!param) return [t.noAppParam];
        if (!APPS.includes(param)) return [t.unknownApp(param)];

        setActiveApp(param);
        return [`Launching "${param}"...`];

      case 'translate':
        if (!param) return [t.translating(language)];
        if (!translations[param]) return [t.langNotSupported(param)];
        setLanguage(param);
        return [t.translating(param)];

      default:
        return [t.unknownCommand(cmd)];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newLines = [`> ${input}`, ...handleCommand(input)];
    setLines(prev => [...prev, ...newLines]);
    setHistory(prev => [...prev, input]);
    setHistoryIndex(null);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const newIndex = historyIndex === null ? history.length - 1 : Math.max(historyIndex - 1, 0);
      setHistoryIndex(newIndex);
      setInput(history[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length === 0) return;
      if (historyIndex === null) return;
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex]);
      if (newIndex === history.length - 1) {
        setHistoryIndex(null);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleAutoComplete();
    }
  };

  useEffect(() => {
    if (!activeApp) inputRef.current?.focus();
  }, [lines, activeApp]);

  const renderApp = () => {
    switch (activeApp) {
      case 'portfolio':
        return <Portfolio />;
      case 'timer':
        return <Timer />;
      case 'checklist':
        return <Checklist />;
      case 'notetohz':
        return <NoteToHz />;
      case 'bpm':
        return <BpmConverter />;
      case 'clock':
        return <WorldClock />;
      case 'pomodoro':
        return <Pomodoro />;
      case 'pass-gen':
        return <PasswordGenerator />;
      case 'qrcode':
        return <QRCodeGenerator />;
      case 'ascii':
        return <AsciiGenerator />;
      case 'pass-check':
        return <PasswordValidator />;
      case 'weather':
        return <Weather />;
      default:
        return null;
    }
  };

  return (
    <div
      className="terminal"
      style={{
        background: 'black',
        color: 'lime',
        fontFamily: 'monospace',
        padding: '1rem',
        height: '100vh',
        overflowY: 'auto',
        border: 'none',
        outline: 'none',
        boxSizing: 'border-box',
      }}
      onClick={(e) => {
        if (!activeApp && e.target === e.currentTarget) {
          inputRef.current?.focus();
        }
      }}
    >
      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}

      <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
        <span>&gt;&nbsp;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            background: 'black',
            color: 'lime',
            border: 'none',
            outline: 'none',
            flex: 1,
          }}
          autoComplete="off"
          spellCheck="false"
        />
      </form>

      <div style={{ marginTop: '1rem' }}>{renderApp()}</div>
    </div>
  );
}