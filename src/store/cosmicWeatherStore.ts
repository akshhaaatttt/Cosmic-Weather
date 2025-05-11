import { create } from 'zustand';
import { fetchAstronomyPictureOfDay } from '../services/nasaApi';
import { fetchLocalWeather, fetchWeatherByCity } from '../services/weatherApi';
import { CosmicWeatherState } from '../types';

export const useCosmicWeatherStore = create<CosmicWeatherState>((set, get) => ({
  apodData: null,
  weatherData: null,
  loading: {
    apod: false,
    weather: false,
  },
  error: {
    apod: null,
    weather: null,
  },
  city: '',
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  theme: (localStorage.getItem('theme') as 'dark' | 'light') || 
         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  
  fetchAPOD: async () => {
    set((state) => ({ loading: { ...state.loading, apod: true }, error: { ...state.error, apod: null } }));
    
    try {
      const data = await fetchAstronomyPictureOfDay();
      set({ apodData: data, loading: { ...get().loading, apod: false } });
    } catch (error) {
      set({ 
        error: { ...get().error, apod: 'Failed to fetch astronomy picture of the day.' },
        loading: { ...get().loading, apod: false }
      });
    }
  },
  
  fetchWeather: async (location) => {
    set((state) => ({ 
      loading: { ...state.loading, weather: true }, 
      error: { ...state.error, weather: null }
    }));
    
    try {
      let data;
      
      if (location) {
        data = await fetchWeatherByCity(location);
        set({ city: location });
      } else {
        data = await fetchLocalWeather();
        set({ city: data.name });
      }
      
      set({ 
        weatherData: data, 
        loading: { ...get().loading, weather: false }
      });
    } catch (error) {
      set({ 
        error: { ...get().error, weather: 'Failed to fetch weather data. Please try another location.' },
        loading: { ...get().loading, weather: false }
      });
    }
  },
  
  setCity: (city) => set({ city }),
  
  toggleFavorite: (date) => {
    const currentFavorites = [...get().favorites];
    const index = currentFavorites.indexOf(date);
    
    if (index === -1) {
      currentFavorites.push(date);
    } else {
      currentFavorites.splice(index, 1);
    }
    
    localStorage.setItem('favorites', JSON.stringify(currentFavorites));
    set({ favorites: currentFavorites });
  },
  
  toggleTheme: () => {
    const newTheme = get().theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    set({ theme: newTheme });
  }
}));