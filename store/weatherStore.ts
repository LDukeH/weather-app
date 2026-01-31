import { create } from "zustand";
import { WeatherData, HourlyWeatherData } from "@/weather/weather.types";

interface WeatherState {
  temperature: number;
  condition: string;
  weatherData: WeatherData;
  hourlyWeatherData: HourlyWeatherData;
  setWeatherData: (data: WeatherData) => void;
  setHourlyWeatherData: (data: HourlyWeatherData) => void;
}

const useWeatherStore = create<WeatherState>((set) => ({
  weatherData: {} as WeatherData,
  hourlyWeatherData: {} as HourlyWeatherData,
  temperature: 0,
  condition: "",
  setWeatherData: (data: WeatherData) => set({ weatherData: data }),
  setHourlyWeatherData: (data: HourlyWeatherData) =>
    set({ hourlyWeatherData: data }),
}));

export default useWeatherStore;
