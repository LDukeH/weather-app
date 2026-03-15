//icon mapping
import { WEATHER_IMAGE_MAP, mapWeatherCode } from "@/weather/weather.map";
import { DailyWeather, OpenMeteoWeatherData } from "@/weather/weather.types";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";

function DailyCard({ weather }: { weather: DailyWeather }) {
  //data formatting
  const currentDate = new Date(weather.time);
  const currentCondition = mapWeatherCode(weather.weather_code);
  const currentConditionImage =
    WEATHER_IMAGE_MAP[currentCondition as keyof typeof WEATHER_IMAGE_MAP];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  //render
  return (
    <Card size="small" className="flex flex-col items-center w-full gap-4 py-4">
      <CardTitle className="text-lg font-base">
        {formatDate(currentDate)}
      </CardTitle>
      <Image
        src={currentConditionImage}
        alt={currentCondition}
        height={50}
        width={50}
      />
      <CardFooter className="flex justify-between w-full px-2 font-semibold">
        <p>{Math.round(weather.tempMin)}°</p>
        <p className="text-muted-foreground">{Math.round(weather.tempMax)}°</p>
      </CardFooter>
    </Card>
  );
}

const formatDailyWeather = (data: OpenMeteoWeatherData) => {
  const { time, weather_code, temperature_2m_max, temperature_2m_min } =
    data.daily;

  return time.map((date, i) => ({
    time: date,
    weather_code: weather_code[i],
    tempMax: temperature_2m_max[i],
    tempMin: temperature_2m_min[i],
  }));
};

export default function DailyForecast({
  weatherData,
}: {
  weatherData: OpenMeteoWeatherData;
}) {
  console.log(weatherData);
  const daily = formatDailyWeather(weatherData);
  return (
    <main className="flex flex-col gap-5">
      <header className="text-xl font-medium text-accent-foreground">
        Daily forecast
      </header>

      <section className="grid grid-cols-3 gap-2 lg:gap-6 sm:flex">
        {daily.map((dailyWeather) => (
          <DailyCard key={dailyWeather.time} weather={dailyWeather} />
        ))}
      </section>
    </main>
  );
}
