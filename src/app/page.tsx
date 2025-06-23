"use client"

import { useState, useEffect } from "react"
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
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type WeatherDetail = {
  icon: React.ElementType
  label: string
  value: string
  color: string
  delay: string
}

export default function Page() {
  const [city, setCity] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  const weatherData = {
    city: "New York",
    temperature: 24,
    description: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    feelsLike: 26,
  }

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase()
    if (desc.includes("sunny") || desc.includes("clear")) return Sun
    if (desc.includes("rain")) return CloudRain
    if (desc.includes("snow")) return Snow
    if (desc.includes("cloud")) return Cloud
    return Sun
  }

  const WeatherIcon = getWeatherIcon(weatherData.description)

  const renderWeatherParticles = () => {
    const desc = weatherData.description.toLowerCase()
    const particles = []

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
          />,
        )
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
          />,
        )
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
          />,
        )
      }
    }

    return particles
  }

  const weatherDetails: WeatherDetail[] = [
    {
      icon: Thermometer,
      label: "Feels like",
      value: `${weatherData.feelsLike}°`,
      color: "orange",
      delay: "delay-700",
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${weatherData.humidity}%`,
      color: "blue",
      delay: "delay-800",
    },
    {
      icon: Wind,
      label: "Wind",
      value: `${weatherData.windSpeed} km/h`,
      color: "green",
      delay: "delay-900",
    },
    {
      icon: Eye,
      label: "Visibility",
      value: `${weatherData.visibility} km`,
      color: "purple",
      delay: "delay-1000",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 flex items-center justify-center relative overflow-hidden">
      {/* Background blobs & particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
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

      {/* Weather particles */}
      <div className="absolute inset-0 pointer-events-none">{renderWeatherParticles()}</div>

      {/* Main content */}
      <div className={`w-full max-w-md space-y-6 relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Search Bar */}
        <Card className="backdrop-blur-xl bg-black/20 border-white/10 shadow-2xl ring-1 ring-white/5 transition-all duration-700 hover:scale-105">
          <CardContent className="p-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for a city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:bg-white/10 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 rounded-xl text-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Weather Card */}
        <Card className="backdrop-blur-xl bg-black/30 border-white/10 shadow-2xl ring-1 ring-white/5 hover:scale-[1.02] transition-all duration-700">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-purple-400 animate-bounce" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-shimmer">
                  {weatherData.city}
                </h1>
              </div>
              <p className="text-gray-400 text-sm font-medium">
                Today • {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </p>
            </div>

            {/* Temperature */}
            <div className="flex items-center justify-center mb-8">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
                  <div className="relative animate-float">
                    <WeatherIcon className="w-24 h-24 text-white mx-auto" />
                  </div>
                </div>
                <div className="text-7xl font-extralight bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent mb-3">
                  {weatherData.temperature}°
                </div>
                <p className="text-gray-300 text-xl font-medium tracking-wide">{weatherData.description}</p>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {weatherDetails.map((item, index) => (
                <div
                  key={index}
                  className={`backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-500 group`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 bg-${item.color}-500/20 rounded-lg`}>
                      <item.icon className={`w-4 h-4 text-${item.color}-400`} />
                    </div>
                    <span className="text-gray-400 text-sm font-medium">{item.label}</span>
                  </div>
                  <p className="text-white font-bold text-xl">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Button */}
            <Button className="w-full mt-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:scale-105 transition-all duration-500">
              Get Weather
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
