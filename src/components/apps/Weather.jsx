import { useState } from 'react';

export default function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Função para buscar latitude/longitude da cidade
  async function fetchCoordinates(cityName) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return {
        latitude: data.results[0].latitude,
        longitude: data.results[0].longitude,
        name: data.results[0].name,
        country: data.results[0].country,
      };
    } else {
      throw new Error('Cidade não encontrada');
    }
  }

  // Função para buscar o clima atual usando lat/lon
  async function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.current_weather) {
      return data.current_weather;
    } else {
      throw new Error('Dados de clima indisponíveis');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const coords = await fetchCoordinates(city);
      const currentWeather = await fetchWeather(coords.latitude, coords.longitude);
      setWeather({ ...currentWeather, city: coords.name, country: coords.country });
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <div style={{ color: 'lime', fontFamily: 'monospace', padding: '1rem' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Escreve uma cidade..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            backgroundColor: 'black',
            color: 'lime',
            border: '1px solid lime',
            padding: '0.5rem',
            fontFamily: 'monospace',
            width: '80%',
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: '0.5rem',
            backgroundColor: 'lime',
            color: 'black',
            border: 'none',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            fontFamily: 'monospace',
          }}
        >
          Ver Clima
        </button>
      </form>

      {loading && <p>Carregando...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div>
          <h3>
            Clima em {weather.city}, {weather.country}
          </h3>
          <p>Temperatura: {weather.temperature}°C</p>
          <p>Velocidade do vento: {weather.windspeed} km/h</p>
          <p>Direção do vento: {weather.winddirection}°</p>
          <p>Última atualização: {new Date(weather.time).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}