// NASA APOD API Types
export interface NASAAPODResponse {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

// Weather API Types
export interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  weather: [
    {
      main: string;
      description: string;
      icon: string;
    }
  ];
  wind: {
    speed: number;
  };
  visibility: number;
  sys: {
    country: string;
  };
}