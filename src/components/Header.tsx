import React, { useState } from 'react';
import { Moon, Sun, Search, Rocket } from 'lucide-react';
import { useCosmicWeatherStore } from '../store/cosmicWeatherStore';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const { theme, toggleTheme, fetchWeather, city, setCity } = useCosmicWeatherStore();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeather(searchInput.trim());
      setSearchInput('');
    }
  };

  return (
    <motion.header 
      className={`p-4 ${theme === 'dark' ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-md sticky top-0 z-10`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Rocket className={theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'} size={28} />
          <h1 className={`text-2xl font-bold font-['Space_Grotesk'] ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Cosmic Weather
          </h1>
        </motion.div>

        <form onSubmit={handleSearch} className="relative flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search for a city..."
            className={`w-full py-2 pl-10 pr-4 rounded-full outline-none focus:ring-2 ${
              theme === 'dark' 
                ? 'bg-gray-800 text-white focus:ring-indigo-500 placeholder:text-gray-400'
                : 'bg-gray-100 text-gray-900 focus:ring-indigo-400 placeholder:text-gray-500'
            }`}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Search 
            size={18} 
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} 
          />
        </form>

        <div className="flex items-center gap-4">
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {city ? `Current: ${city}` : 'Location: Not set'}
          </p>
          <motion.button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              theme === 'dark' ? 'bg-gray-700 text-yellow-300' : 'bg-indigo-100 text-indigo-700'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;