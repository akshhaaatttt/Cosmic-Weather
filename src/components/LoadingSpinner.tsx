import React from 'react';
import { motion } from 'framer-motion';
import { useCosmicWeatherStore } from '../store/cosmicWeatherStore';

const LoadingSpinner: React.FC = () => {
  const { theme } = useCosmicWeatherStore();
  
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className={`w-16 h-16 border-4 border-t-transparent rounded-full ${
            theme === 'dark' ? 'border-indigo-400' : 'border-indigo-600'
          }`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      <motion.p
        className={`mt-4 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        Loading cosmic data...
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;