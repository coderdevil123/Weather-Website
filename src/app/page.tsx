"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=894beaad98ab419a7b3814d1a907cdd8&units=metric`);
      setWeather(res.data);
    } catch {
      alert("Error: City not found or API error");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-400 to-blue-800 text-white p-4">
      <h1 className="text-4xl font-bold mb-6">🌦️ Weather App</h1>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="text-black p-2 rounded-lg mb-4 w-64 text-center"
      />
      <button onClick={fetchWeather} className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg">
        Get Weather
      </button>

      {weather && (
        <div className="mt-6 p-4 bg-white rounded-xl text-black shadow-lg text-center w-72">
          <h2 className="text-2xl font-bold">{weather.name}</h2>
          <p className="text-xl">{weather.main.temp} °C</p>
          <p className="capitalize">{weather.weather[0].description}</p>
        </div>
      )}
    </main>
  );
}
