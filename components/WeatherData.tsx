"use client";

import useWeatherStore from "@/store/weatherStore";
import MainWeather from "./ui/weather/main-weather";
import DailyForecast from "./ui/weather/daily-forecast";
import HourlyData from "./ui/weather/hourly-forecast";
import HourlySkeleton from "./ui/skeletons/hourly-skeleton";
import MainWeatherSkeleton from "./ui/skeletons/main-weather-skeleton";
import WeatherSkeleton from "./ui/skeletons/weather-skeleton";
import DailySkeleton from "./ui/skeletons/daily-skeleton";

export default function WeatherData() {
  const { weatherData, hourlyWeatherData, weatherLoading } = useWeatherStore();

  if (weatherLoading) {
    return <WeatherSkeleton />;
  }
  // rendering goes here
  if (!weatherData || !weatherData.city || !weatherData.list) {
    return <div></div>;
  }

  return (
    <main className="flex flex-col w-full gap-8 text-white lg:flex-row">
      <section className="flex flex-col lg:max-w-5xl gap-3 lg:flex-[2]">
        <MainWeather weatherData={weatherData} />

        {/* daily forecast here */}

        <DailyForecast weatherData={weatherData} />
      </section>

      {/* hourly forecast goes here  */}
      <section className="flex flex-col flex-1 gap-8 lg:flex-[1]">
        <HourlyData hourlyWeatherData={hourlyWeatherData} />
      </section>
    </main>
  );
}
