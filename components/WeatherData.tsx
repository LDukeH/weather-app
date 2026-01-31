"use client";

import useWeatherStore from "@/store/weatherStore";
import MainWeather from "./ui/weather/main-weather";
import DailyForecast from "./ui/weather/daily-forecast";
import HourlyData from "./ui/weather/hourly-forecast";
import { useState } from "react";

export default function WeatherData() {
  const { weatherData } = useWeatherStore();
  const { hourlyWeatherData } = useWeatherStore();

  // rendering goes here
  if (!weatherData || !weatherData.city || !weatherData.list) {
    return <div className="text-white">No data available</div>;
  }

  return (
    <main className="flex flex-row gap-8 text-white">
      <section className="flex flex-col gap-8">
        <MainWeather weatherData={weatherData} />

        {/* daily forecast here */}
        <DailyForecast weatherData={weatherData} />
      </section>

      {/* hourly forecast goes here  */}
      <section className="min-w-md">
        <HourlyData hourlyWeatherData={hourlyWeatherData} />
      </section>
    </main>
  );
}
