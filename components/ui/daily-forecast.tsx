//icon mapping
import { WEATHER_IMAGE_MAP } from "@/weather/weather.map";
import { DailyWeather, WeatherData } from "@/weather/weather.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

function DailyCard({ weather }: { weather: DailyWeather }) {
  //data formatting
  const currentDate = new Date(weather.dt * 1000);
  const currentCondition = weather.weather[0].main;
  const currentConditionImage =
    WEATHER_IMAGE_MAP[currentCondition as keyof typeof WEATHER_IMAGE_MAP];
  console.log(weather);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  //render
  return (
    <Card size="small" className="flex flex-col items-center py-4">
      <CardTitle className="text-lg font-base">
        {formatDate(currentDate)}
      </CardTitle>
      <Image
        src={currentConditionImage}
        alt={currentCondition}
        height={50}
        width={50}
      />
      <CardFooter className="flex justify-between w-full px-2 font-base">
        <p>{Math.round(weather.temp.min)}°</p>
        <p className="text-muted-foreground">{Math.round(weather.temp.max)}°</p>
      </CardFooter>
    </Card>
  );
}

export default function DailyForecast({
  weatherData,
}: {
  weatherData: WeatherData;
}) {
  const { list } = weatherData;
  return (
    <main className="flex flex-col gap-5">
      <header className="text-xl font-medium text-accent-foreground">
        Daily forecast
      </header>

      <section className="flex gap-4">
        {list.map((dailyWeather) => (
          <DailyCard key={dailyWeather.dt} weather={dailyWeather} />
        ))}
      </section>
    </main>
  );
}
