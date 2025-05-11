import React from 'react';
import { Github, Rocket, ExternalLink } from 'lucide-react';
import { useCosmicWeatherStore } from '../store/cosmicWeatherStore';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const { theme } = useCosmicWeatherStore();
  
  return (
    <motion.footer 
      className={`py-6 mt-8 ${theme === 'dark' ? 'bg-gray-900/80 text-gray-300' : 'bg-gray-100/80 text-gray-600'} backdrop-blur-md`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Rocket className={theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'} size={20} />
            <p className="text-sm">
              Cosmic Weather © {new Date().getFullYear()}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <p>Powered by</p>
              <a 
                href="https://api.nasa.gov/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
              >
                NASA API <ExternalLink size={14} />
              </a>
              <span className="mx-1">and</span>
              <a 
                href="https://openweathermap.org/api" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
              >
                OpenWeatherMap <ExternalLink size={14} />
              </a>
            </div>
            
            <a 
              href="https://github.com/akshhaaatttt" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <Github size={16} /> View on GitHub
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;