"use client";

import useWeatherStore from "@/store/weatherStore";
import { useEffect } from "react";

export default function WeatherData() {
  const { weatherData } = useWeatherStore();

  //   use these to format
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  //

  useEffect(() => {
    console.log("From weatherData: ", weatherData);
  }, [weatherData]);

  const { city, list } = weatherData;

  const currentDate = new Date(list?.[0]?.dt * 1000);

  if (!weatherData || !city || !list) {
    return <div className="text-white">No data available</div>;
  }

  return (
    <div className="text-white">
      <div>
        {city.name}, {regionNames.of(city.country)}
      </div>
      <div>{formatDate(currentDate)}</div>
    </div>
  );
}
