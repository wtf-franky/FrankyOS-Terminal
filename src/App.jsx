import { LanguageProvider } from './components/LanguageContext';
import Terminal from './components/Terminal';

export default function App() {
  return (
    <LanguageProvider>
      <Terminal />
    </LanguageProvider>
  );
}