"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Cloud,
  Sun,
  CloudRain,
  CloudSnowIcon as Snow,
  Wind,
  Droplets,
  Eye,
  Thermometer,
  MapPin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
  visibility: number;
}

export default function Component() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=894beaad98ab419a7b3814d1a907cdd8&units=metric`
      );
      setWeatherData(res.data);
    } catch {
      alert("City not found or API error");
    }
  };

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes("sunny") || desc.includes("clear")) return Sun;
    if (desc.includes("rain")) return CloudRain;
    if (desc.includes("snow")) return Snow;
    if (desc.includes("cloud")) return Cloud;
    return Sun;
  };

  const renderWeatherParticles = (description: string) => {
    const desc = description.toLowerCase();
    const particles = [];

    if (desc.includes("rain")) {
      for (let i = 0; i < 50; i++) {
        particles.push(
          <div
            key={i}
            className="absolute w-0.5 h-4 bg-blue-300/60 rounded-full animate-rain"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
            }}
          />
        );
      }
    } else if (desc.includes("snow")) {
      for (let i = 0; i < 30; i++) {
        particles.push(
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/80 rounded-full animate-snow"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        );
      }
    } else if (desc.includes("cloud")) {
      for (let i = 0; i < 20; i++) {
        particles.push(
          <div
            key={i}
            className="absolute w-8 h-4 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        );
      }
    }

    return particles;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 flex items-center justify-center relative overflow-hidden">
      {/* Animated BG */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {weatherData && (
        <div className="absolute inset-0 pointer-events-none">
          {renderWeatherParticles(weatherData.weather[0].description)}
        </div>
      )}

      {/* Weather Card */}
      <div
        className={`w-full max-w-md space-y-6 relative z-10 transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Search */}
        <Card className="backdrop-blur-xl bg-black/20 border-white/10 shadow-2xl ring-1 ring-white/5">
          <CardContent className="p-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for a city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-gray-400 rounded-xl"
              />
            </div>
            <Button
              onClick={fetchWeather}
              className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white"
            >
              Get Weather
            </Button>
          </CardContent>
        </Card>

        {/* Weather Data Card */}
        {weatherData && (
          <Card className="backdrop-blur-xl bg-black/30 border-white/10 shadow-2xl ring-1 ring-white/5">
            <CardContent className="p-8">
              {/* City + Date */}
              <div className="text-center mb-8">
                <div className="flex justify-center items-center gap-2">
                  <MapPin className="text-purple-400 animate-bounce" />
                  <h1 className="text-3xl font-bold text-white">{weatherData.name}</h1>
                </div>
                <p className="text-gray-400 text-sm">
                  Today •{" "}
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Temperature and Icon */}
              <div className="flex justify-center mb-8">
                <div className="text-center">
                  <getWeatherIcon
                    description={weatherData.weather[0].description}
                  />
                  <div className="text-7xl text-white font-light">
                    {weatherData.main.temp}°
                  </div>
                  <p className="text-gray-300 text-xl">
                    {weatherData.weather[0].description}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <WeatherDetail icon={Thermometer} label="Feels Like" value={`${weatherData.main.feels_like}°`} />
                <WeatherDetail icon={Droplets} label="Humidity" value={`${weatherData.main.humidity}%`} />
                <WeatherDetail icon={Wind} label="Wind" value={`${weatherData.wind.speed} km/h`} />
                <WeatherDetail icon={Eye} label="Visibility" value={`${weatherData.visibility / 1000} km`} />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// Component for detail card
function WeatherDetail({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-white hover:bg-white/10 transition">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-5 h-5 text-purple-400" />
        <span className="text-sm">{label}</span>
      </div>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}
