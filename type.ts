export interface WeatherData {
  list: ListItem[];
  city: City;
}

export interface ListItem {
  clouds: number;
  deg: number;
  dt: number;
  gust: number;
  humidity: number;
  pop: number;
  pressure: number;
  rain: number;
  speed: number;
  sunrise: number;
  sunset: number;
  temp: Temp;
  weather: Weather[];
}

export interface Temp {
  min: number;
  max: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface City {
  coord: Coord;
  country: string;
  id: number;
  name: string;
  population: number;
  timezone: number;
}

export interface Coord {
  lon: number;
  lat: number;
}
