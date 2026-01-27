"use client";

import useWeatherStore from "@/store/weatherStore";
import MainWeather from "./ui/main-weather";
import DailyForecast from "./ui/daily-forecast";

export default function WeatherData() {
  const { weatherData } = useWeatherStore();

  // rendering goes here
  if (!weatherData || !weatherData.city || !weatherData.list) {
    return <div className="text-white">No data available</div>;
  }

  return (
    <main className="flex flex-row text-white ">
      <section className="flex flex-col gap-8">
        <MainWeather weatherData={weatherData} />

        {/* daily forecast here */}
        <DailyForecast weatherData={weatherData} />
      </section>

      {/* hourly forecast goes here  */}
      <section className="pl-4 min-w-md">
        <div className="border-1">Hello</div>
      </section>
    </main>
  );
}
