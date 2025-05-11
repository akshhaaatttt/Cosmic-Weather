import React from 'react';
import { Cloud, CloudRain, CloudSnow, CloudSun, Sun, Wind, Thermometer, Droplets } from 'lucide-react';
import { WeatherResponse } from '../types';
import { motion } from 'framer-motion';
import { useCosmicWeatherStore } from '../store/cosmicWeatherStore';

interface WeatherCardProps {
  weatherData: WeatherResponse;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const { theme } = useCosmicWeatherStore();
  
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="text-yellow-400" size={48} />;
      case 'clouds':
        return <CloudSun className="text-gray-400" size={48} />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="text-blue-400" size={48} />;
      case 'snow':
        return <CloudSnow className="text-blue-200" size={48} />;
      case 'thunderstorm':
        return <CloudRain className="text-purple-500" size={48} />;
      case 'mist':
      case 'fog':
        return <Cloud className="text-gray-300" size={48} />;
      default:
        return <Wind className="text-gray-400" size={48} />;
    }
  };
  
  // Early return if weatherData or required nested properties are missing
  if (!weatherData?.weather?.[0] || !weatherData?.main) {
    return (
      <div className={`rounded-2xl p-6 ${
        theme === 'dark' 
          ? 'bg-gray-800/70 text-white' 
          : 'bg-white/80 text-gray-800'
      } shadow-lg backdrop-blur-md`}>
        <p>Weather data unavailable</p>
      </div>
    );
  }
  
  return (
    <motion.div 
      className={`rounded-2xl p-6 ${
        theme === 'dark' 
          ? 'bg-gray-800/70 text-white' 
          : 'bg-white/80 text-gray-800'
      } shadow-lg backdrop-blur-md`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {getWeatherIcon(weatherData.weather[0].main)}
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold">{weatherData.name}, {weatherData.sys.country}</h2>
              <p className="text-lg capitalize">{weatherData.weather[0].description}</p>
            </div>
          </div>
          
          <div className="flex items-end mt-6">
            <div className="text-6xl font-bold">{Math.round(weatherData.main.temp)}°C</div>
            <div className="ml-4">
              <p className="flex items-center gap-1">
                <Thermometer size={16} className="text-red-400" />
                Feels like: {Math.round(weatherData.main.feels_like)}°C
              </p>
              <p className="flex items-center gap-1">
                <Droplets size={16} className="text-blue-400" />
                Humidity: {weatherData.main.humidity}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-3 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100/70'
            }`}>
              <p className="text-sm opacity-80">Wind</p>
              <p className="text-xl">{Math.round(weatherData.wind.speed * 3.6)} km/h</p>
            </div>
            <div className={`p-3 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100/70'
            }`}>
              <p className="text-sm opacity-80">Pressure</p>
              <p className="text-xl">{weatherData.main.pressure} mb</p>
            </div>
            <div className={`p-3 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100/70'
            }`}>
              <p className="text-sm opacity-80">Visibility</p>
              <p className="text-xl">{(weatherData.visibility / 1000).toFixed(1)} km</p>
            </div>
            <div className={`p-3 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100/70'
            }`}>
              <p className="text-sm opacity-80">Description</p>
              <p className="text-xl capitalize">{weatherData.weather[0].description}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;