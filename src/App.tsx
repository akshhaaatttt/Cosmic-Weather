import React, { useEffect } from 'react';
import { useCosmicWeatherStore } from './store/cosmicWeatherStore';
import Header from './components/Header';
import CosmicImageCard from './components/CosmicImageCard';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Footer from './components/Footer';
import StarryBackground from './components/StarryBackground';

function App() {
  const { 
    apodData, 
    weatherData, 
    loading, 
    error, 
    fetchAPOD, 
    fetchWeather,
    theme
  } = useCosmicWeatherStore();

  // Fetch data on mount
  useEffect(() => {
    fetchAPOD();
    fetchWeather();
  }, [fetchAPOD, fetchWeather]);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`min-h-screen font-['Inter'] ${
      theme === 'dark' ? 'bg-gradient-to-b from-gray-900 to-indigo-950 text-white' : 'bg-gradient-to-b from-blue-50 to-indigo-100 text-gray-900'
    }`}>
      <StarryBackground weatherCondition={weatherData?.weather?.[0]?.main} />
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 font-['Space_Grotesk'] ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Explore the Cosmos <span className="text-indigo-500">and</span> Weather
          </h1>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover the beauty of space while checking your local weather conditions
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className={`text-2xl font-bold mb-4 font-['Space_Grotesk'] ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              NASA Astronomy Picture of the Day
            </h2>
            
            {loading.apod ? (
              <LoadingSpinner />
            ) : error.apod ? (
              <ErrorMessage message={error.apod} onRetry={fetchAPOD} />
            ) : apodData ? (
              <CosmicImageCard apodData={apodData} />
            ) : null}
          </div>
          
          <div>
            <h2 className={`text-2xl font-bold mb-4 font-['Space_Grotesk'] ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Current Weather
            </h2>
            
            {loading.weather ? (
              <LoadingSpinner />
            ) : error.weather ? (
              <ErrorMessage message={error.weather} onRetry={() => fetchWeather()} />
            ) : weatherData ? (
              <WeatherCard weatherData={weatherData} />
            ) : null}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <h2 className={`text-2xl font-bold mb-4 font-['Space_Grotesk'] ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Cosmic Weather Connection
          </h2>
          <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            From the vast expanse of space to the weather patterns on our own planet, 
            both cosmic and Earth phenomena are interconnected. The same laws of physics 
            that govern distant galaxies also influence our daily weather here on Earth.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;