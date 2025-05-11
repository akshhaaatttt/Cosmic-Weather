import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCosmicWeatherStore } from '../store/cosmicWeatherStore';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  const { theme } = useCosmicWeatherStore();
  
  return (
    <motion.div
      className={`p-6 rounded-lg shadow-md ${
        theme === 'dark' ? 'bg-red-900/20 text-red-200' : 'bg-red-50 text-red-800'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3">
        <AlertTriangle className={theme === 'dark' ? 'text-red-300' : 'text-red-500'} size={24} />
        <h3 className="text-lg font-semibold">Error</h3>
      </div>
      <p className="mt-2">{message}</p>
      
      {onRetry && (
        <motion.button
          onClick={onRetry}
          className={`mt-4 px-4 py-2 rounded-md ${
            theme === 'dark' 
              ? 'bg-red-800/50 hover:bg-red-800 text-white' 
              : 'bg-red-100 hover:bg-red-200 text-red-800'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};

export default ErrorMessage;