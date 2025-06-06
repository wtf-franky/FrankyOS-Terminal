import { useState, useEffect } from 'react';

const cities = [
  { name: 'Lisboa', timezone: 'Europe/Lisbon' },
  { name: 'Nova Iorque', timezone: 'America/New_York' },
  { name: 'Tóquio', timezone: 'Asia/Tokyo' },
  { name: 'Sydney', timezone: 'Australia/Sydney' },
];

export default function WorldClock() {
  const [times, setTimes] = useState({});

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const newTimes = {};
      cities.forEach(city => {
        newTimes[city.name] = now.toLocaleTimeString('pt-PT', { timeZone: city.timezone, hour12: false });
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Relógio Mundial</h2>
      <ul>
        {cities.map(city => (
          <li key={city.name}>
            <strong>{city.name}:</strong> {times[city.name] || '--:--:--'}
          </li>
        ))}
      </ul>
    </div>
  );
}