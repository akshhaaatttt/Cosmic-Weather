import axios from 'axios';
import { WeatherResponse } from '../types';

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

if (!WEATHER_API_KEY) {
  console.error('Weather API key is not defined. Please check your environment variables.');
}

const BASE_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEOCODING_API_URL = 'https://api.openweathermap.org/geo/1.0/direct';

interface GeocodingResponse {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

const getCoordinatesFromCity = async (city: string): Promise<GeocodingResponse> => {
  try {
    const response = await axios.get(GEOCODING_API_URL, {
      params: {
        q: city,
        limit: 1,
        appid: WEATHER_API_KEY
      }
    });
    
    if (!response.data?.[0]) {
      throw new Error('City not found');
    }
    
    return response.data[0];
  } catch (error) {
    console.error(`Error getting coordinates for ${city}:`, error);
    throw new Error('Unable to find location. Please try another city.');
  }
};

export const fetchWeatherByCity = async (city: string): Promise<WeatherResponse> => {
  try {
    const coordinates = await getCoordinatesFromCity(city);
    return fetchWeatherByCoordinates(coordinates.lat, coordinates.lon);
  } catch (error) {
    console.error(`Error fetching weather for ${city}:`, error);
    throw new Error('Unable to fetch weather data. Please try again later.');
  }
};

export const fetchWeatherByCoordinates = async (
  lat: number,
  lon: number
): Promise<WeatherResponse> => {
  try {
    const response = await axios.get(BASE_WEATHER_API_URL, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: 'metric'
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching weather for coordinates (${lat}, ${lon}):`, error);
    throw new Error('Unable to fetch weather data. Please try again later.');
  }
};

// Get user's current location weather
export const fetchLocalWeather = async (): Promise<WeatherResponse> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      fetchWeatherByCity('Jaipur')
        .then(resolve)
        .catch(reject);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherData = await fetchWeatherByCoordinates(latitude, longitude);
          resolve(weatherData);
        } catch (error) {
          try {
            const weatherData = await fetchWeatherByCity('Jaipur');
            resolve(weatherData);
          } catch (fallbackError) {
            reject(new Error('Unable to fetch weather data. Please try again later.'));
          }
        }
      },
      async (error) => {
        try {
          const weatherData = await fetchWeatherByCity('Jaipur');
          resolve(weatherData);
        } catch (fallbackError) {
          reject(new Error('Unable to fetch weather data. Please enter a city manually.'));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  });
};