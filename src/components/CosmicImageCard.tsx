import React from 'react';
import { Heart, Info, ExternalLink, Calendar } from 'lucide-react';
import { NASAAPODResponse } from '../types';
import { motion } from 'framer-motion';
import { useCosmicWeatherStore } from '../store/cosmicWeatherStore';

interface CosmicImageCardProps {
  apodData: NASAAPODResponse;
}

const CosmicImageCard: React.FC<CosmicImageCardProps> = ({ apodData }) => {
  const { theme, favorites, toggleFavorite } = useCosmicWeatherStore();
  const isFavorite = favorites.includes(apodData.date);
  
  const [showInfo, setShowInfo] = React.useState(false);
  
  return (
    <motion.div 
      className={`relative rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800/70' : 'bg-white/80'} shadow-lg`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative aspect-[16/9] md:aspect-auto md:h-[500px] overflow-hidden">
        {apodData.media_type === 'image' ? (
          <img 
            src={apodData.url} 
            alt={apodData.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-black">
            <iframe
              title={apodData.title}
              src={apodData.url}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        )}
        
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.button
            onClick={() => toggleFavorite(apodData.date)}
            className={`p-2 rounded-full ${
              isFavorite 
                ? 'bg-pink-500 text-white' 
                : `${theme === 'dark' ? 'bg-gray-700/70' : 'bg-white/70'} ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`
            } backdrop-blur-sm shadow-sm`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart size={20} fill={isFavorite ? 'white' : 'none'} />
          </motion.button>
          
          <motion.button
            onClick={() => setShowInfo(!showInfo)}
            className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700/70 text-gray-200' : 'bg-white/70 text-gray-700'} backdrop-blur-sm shadow-sm`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Info size={20} />
          </motion.button>
          
          {apodData.hdurl && (
            <motion.a
              href={apodData.hdurl}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700/70 text-blue-300' : 'bg-white/70 text-blue-600'} backdrop-blur-sm shadow-sm`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink size={20} />
            </motion.a>
          )}
        </div>
      </div>
      
      <div className={`p-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold font-['Space_Grotesk']">{apodData.title}</h2>
          <div className="flex items-center gap-1 text-sm opacity-70">
            <Calendar size={16} />
            <span>{apodData.date}</span>
          </div>
        </div>
        
        {showInfo && (
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
              {apodData.explanation}
            </p>
            {apodData.copyright && (
              <p className="mt-2 text-sm opacity-70">
                © {apodData.copyright}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CosmicImageCard;