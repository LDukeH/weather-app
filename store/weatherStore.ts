import { create } from "zustand";
import { OpenMeteoWeatherData, OpenMeteoHourly } from "@/weather/weather.types";

interface WeatherState {
  weatherData: OpenMeteoWeatherData | null;
  hourlyWeatherData: OpenMeteoHourly | null;

  temperature: number;
  conditionCode: number;

  weatherLoading: boolean;
  hourlyLoading: boolean;

  setWeatherData: (data: OpenMeteoWeatherData) => void;
  setHourlyWeatherData: (data: OpenMeteoHourly) => void;

  setTemperature: (temp: number) => void;
  setConditionCode: (code: number) => void;

  setWeatherLoading: (loading: boolean) => void;
  setHourlyLoading: (loading: boolean) => void;
}

const useWeatherStore = create<WeatherState>((set) => ({
  weatherData: null,
  hourlyWeatherData: null,

  temperature: 0,
  conditionCode: 0,

  weatherLoading: false,
  hourlyLoading: false,

  setWeatherData: (data) =>
    set({
      weatherData: data,
      temperature: data.current?.temperature_2m ?? 0,
      conditionCode: data.current?.weather_code ?? 0,
    }),

  setHourlyWeatherData: (data) =>
    set({
      hourlyWeatherData: data,
    }),

  setTemperature: (temp) => set({ temperature: temp }),

  setConditionCode: (code) => set({ conditionCode: code }),

  setWeatherLoading: (loading) => set({ weatherLoading: loading }),

  setHourlyLoading: (loading) => set({ hourlyLoading: loading }),
}));

export default useWeatherStore;
