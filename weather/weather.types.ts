export interface OpenMeteoWeatherData {
  latitude: number;
  longitude: number;
  elevation: number;

  generationtime_ms: number;

  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;

  current: OpenMeteoCurrent;
  current_units: OpenMeteoCurrentUnits;

  hourly: OpenMeteoHourly;
  hourly_units: OpenMeteoHourlyUnits;

  daily: OpenMeteoDaily;
  daily_units: OpenMeteoDailyUnits;

  city: WeatherCity;
}

export interface OpenMeteoCurrent {
  time: string;

  temperature_2m: number;
  apparent_temperature: number;

  relative_humidity_2m: number;

  wind_speed_10m: number;

  precipitation: number;

  weather_code: number;

  interval: number;
}

export interface OpenMeteoCurrentUnits {
  time: string;

  temperature_2m: string;
  apparent_temperature: string;

  relative_humidity_2m: string;

  wind_speed_10m: string;

  precipitation: string;

  weather_code: string;

  interval: string;
}

export interface OpenMeteoHourly {
  latitude: number;
  longitude: number;
  elevation: number;

  generationtime_ms: number;

  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;

  hourly: {
    time: string[];
    temperature_2m: number[];
    apparent_temperature: number[];
    relative_humidity_2m: number[];
    precipitation_probability: number[];
    wind_speed_10m: number[];
    weather_code: number[];
  };

  hourly_units: {
    time: string;
    temperature_2m: string;
    apparent_temperature: string;
    relative_humidity_2m: string;
    precipitation_probability: string;
    wind_speed_10m: string;
    weather_code: string;
  };
}
export interface OpenMeteoHourlyUnits {
  time: string;

  temperature_2m: string;

  apparent_temperature: string;

  relative_humidity_2m: string;

  precipitation_probability: string;

  wind_speed_10m: string;
}

export interface OpenMeteoDaily {
  time: string[];

  temperature_2m_max: number[];

  temperature_2m_min: number[];

  precipitation_probability_max: number[];

  weather_code: number[];
}

export interface OpenMeteoDailyUnits {
  time: string;

  temperature_2m_max: string;

  temperature_2m_min: string;

  precipitation_probability_max: string;
}

export interface WeatherCity {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface DailyWeather {
  time: string;
  weather_code: number;
  tempMax: number;
  tempMin: number;
}

export interface HourlyWeather {
  time: string;
  apparent_temperature: number;
  weather_code: number;
}
