export interface DailyWeather {
  dt: number;
  sunrise: number;
  sunset: number;

  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };

  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };

  pressure: number;
  humidity: number;

  speed: number; // wind speed
  deg: number; // wind direction
  gust: number; // wind gust

  clouds: number;
  pop: number; // probability of precipitation

  weather: WeatherCondition[];
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface City {
  id: number;
  name: string;
  country: string;
  population: number;
  timezone: number; // seconds from UTC

  coord: {
    lon: number;
    lat: number;
  };
}

export interface WeatherData {
  city: City;
  list: DailyWeather[];
}
