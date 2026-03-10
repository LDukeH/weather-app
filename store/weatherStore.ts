import { create } from "zustand";
import { WeatherData, HourlyWeatherData } from "@/weather/weather.types";

interface WeatherState {
  temperature: number;
  condition: string;
  weatherData: WeatherData;
  hourlyWeatherData: HourlyWeatherData;
  weatherLoading: boolean;
  hourlyLoading: boolean;
  setWeatherData: (data: WeatherData) => void;
  setHourlyWeatherData: (data: HourlyWeatherData) => void;
  setWeatherLoading: (data: boolean) => void;
}

const useWeatherStore = create<WeatherState>((set) => ({
  weatherData: {} as WeatherData,
  hourlyWeatherData: {} as HourlyWeatherData,
  temperature: 0,
  condition: "",
  weatherLoading: false,
  hourlyLoading: false,
  setWeatherData: (data: WeatherData) => set({ weatherData: data }),
  setHourlyWeatherData: (data: HourlyWeatherData) =>
    set({ hourlyWeatherData: data }),
  setWeatherLoading: (data: boolean) => set({ weatherLoading: data }),
}));

export default useWeatherStore;
