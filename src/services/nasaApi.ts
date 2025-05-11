import axios from 'axios';
import { NASAAPODResponse } from '../types';

// NASA API service
const NASA_API_KEY = 'ToLvhi82nOMhuxvJq38OzqZOyTEtXbA7NNFUZq8r';
const NASA_API_URL = 'https://api.nasa.gov/planetary/apod';

export const fetchAstronomyPictureOfDay = async (): Promise<NASAAPODResponse> => {
  try {
    const response = await axios.get(NASA_API_URL, {
      params: {
        api_key: NASA_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching NASA APOD:', error);
    throw error;
  }
};

export const fetchAstronomyPictureByDate = async (date: string): Promise<NASAAPODResponse> => {
  try {
    const response = await axios.get(NASA_API_URL, {
      params: {
        api_key: NASA_API_KEY,
        date,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching NASA APOD for date ${date}:`, error);
    throw error;
  }
};