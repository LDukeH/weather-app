import { create } from "zustand";
import { WeatherData } from "@/weather/weather.types";

interface WeatherState {
  temperature: number;
  condition: string;
  weatherData: WeatherData;
  setWeatherData: (data: WeatherData) => void;
}

const useWeatherStore = create<WeatherState>((set) => ({
  weatherData: {} as WeatherData,
  temperature: 0,
  condition: "",
  setWeatherData: (data: WeatherData) => set({ weatherData: data }),
}));

export default useWeatherStore;
