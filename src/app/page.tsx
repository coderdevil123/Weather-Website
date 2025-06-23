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
import axios from "axios"

type WeatherDetail = {
  icon: React.ElementType
  label: string
  value: string
  color: string
}

export default function Page() {
  const [city, setCity] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [weatherData, setWeatherData] = useState<null | {
    city: string
    temperature: number
    description: string
    humidity: number
    windSpeed: number
    visibility: number
    feelsLike: number
  }>(null)

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

  const fetchWeather = async () => {
    if (!city.trim()) return alert("Please enter a city name")

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=894beaad98ab419a7b3814d1a907cdd8&units=metric`
      )
      const data = response.data

      setWeatherData({
        city: data.name,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        visibility: data.visibility / 1000, // convert to km
        feelsLike: Math.round(data.main.feels_like),
      })
    } catch (err) {
      alert("City not found or API error")
    }
  }

  const weatherDetails: WeatherDetail[] = weatherData
    ? [
        {
          icon: Thermometer,
          label: "Feels like",
          value: `${weatherData.feelsLike}°`,
          color: "orange",
        },
        {
          icon: Droplets,
          label: "Humidity",
          value: `${weatherData.humidity}%`,
          color: "blue",
        },
        {
          icon: Wind,
          label: "Wind",
          value: `${weatherData.windSpeed} km/h`,
          color: "green",
        },
        {
          icon: Eye,
          label: "Visibility",
          value: `${weatherData.visibility} km`,
          color: "purple",
        },
      ]
    : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 flex items-center justify-center relative overflow-hidden">
      {/* Search bar */}
      <div className="w-full max-w-md space-y-6 relative z-10">
        <Card className="backdrop-blur-xl bg-black/20 border-white/10 shadow-2xl ring-1 ring-white/5">
          <CardContent className="p-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>
          </CardContent>
        </Card>

        {weatherData && (
          <Card className="backdrop-blur-xl bg-black/30 border-white/10 shadow-2xl ring-1 ring-white/5">
            <CardContent className="p-8">
              {/* City and Date */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-purple-400 animate-bounce" />
                  <h1 className="text-3xl font-bold text-white">{weatherData.city}</h1>
                </div>
                <p className="text-gray-400 text-sm font-medium">
                  Today • {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </p>
              </div>

              {/* Weather Icon and Temp */}
              <div className="flex items-center justify-center mb-8">
                <div className="text-center">
                  {(() => {
                    const Icon = getWeatherIcon(weatherData.description)
                    return <Icon className="w-20 h-20 text-white mx-auto mb-4" />
                  })()}
                  <div className="text-6xl font-light text-white mb-2">{weatherData.temperature}°</div>
                  <p className="text-gray-300 text-xl font-medium capitalize">{weatherData.description}</p>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {weatherDetails.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 text-white"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                      <span className="text-sm text-gray-400">{item.label}</span>
                    </div>
                    <p className="text-lg font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Fetch Button */}
        <Button
          onClick={fetchWeather}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:scale-105 transition"
        >
          Get Weather
        </Button>
      </div>
    </div>
  )
}
