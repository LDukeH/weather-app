import { create } from "zustand";

interface WeatherState {
  temperature: number;
  condition: string;
  weatherData: any;
  setWeatherData: (data: any) => void;
}

const useWeatherStore = create<WeatherState>((set) => ({
  weatherData: {},
  temperature: 0,
  condition: "",
  setWeatherData: (data: any) => set({ weatherData: data }),
}));

export default useWeatherStore;
