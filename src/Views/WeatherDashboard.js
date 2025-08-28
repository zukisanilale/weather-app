import { useState, useEffect } from "react";

export default function WeatherDashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Persist favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchWeather = (selectedCity = city) => {
    // Replace this with real API call
    setWeather({
      city: selectedCity,
      temperature: 25,
      humidity: 60,
      description: "Partly cloudy",
    });
  };

  const addFavorite = () => {
    if (!city) return;
    const newFavorite = {
      venueId: Date.now().toString(),
      name: city,
      address: city,
    };
    setFavorites((prev) => [...prev, newFavorite]);
  };

  const removeFavorite = (venueId) => {
    setFavorites((prev) => prev.filter((v) => v.venueId !== venueId));
  };

  const selectFavorite = (favCity) => {
    setCity(favCity);
    fetchWeather(favCity);
  };

  return (
    <div className="container">
      <h2>Weather Dashboard</h2>

      {/* Search / fetch */}
      <div>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => fetchWeather()}>Get Weather</button>
        <button onClick={addFavorite}>⭐ Save as Favorite</button>
      </div>

      {/* Weather card */}
      {weather && (
        <div className="weather-card">
          <h3>{weather.city}</h3>
          <p>🌡️ {weather.temperature}°C</p>
          <p>💧 {weather.humidity}% humidity</p>
          <p>☁️ {weather.description}</p>
        </div>
      )}

      {/* Favorites list */}
      <h3>Favorites</h3>
      <ul>
        {favorites.map((fav) => (
          <li key={fav.venueId}>
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => selectFavorite(fav.name)}
            >
              {fav.name}
            </span>{" "}
            <button onClick={() => removeFavorite(fav.venueId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}