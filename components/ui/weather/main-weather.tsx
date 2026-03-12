import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherData } from "@/weather/weather.types";
import Image from "next/image";

//icon mapping
import { WEATHER_IMAGE_MAP } from "@/weather/weather.map";

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card size="medium" className="gap-6 p-5">
      <CardHeader className="text-lg text-muted-foreground">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-3xl">{value}</CardContent>
    </Card>
  );
}

export default function MainWeather({
  weatherData,
}: {
  weatherData: WeatherData;
}) {
  //   use these to format
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const { city, list } = weatherData;

  //get weather data for current day
  const currentWeather = list[0];
  console.log(currentWeather);
  const currentDate = new Date((currentWeather.dt + city.timezone) * 1000);
  const currentTemp = Math.round(currentWeather.temp.max);

  //get current condition and image
  const currentCondition = currentWeather.weather[0].main;
  const currentConditionImage =
    WEATHER_IMAGE_MAP[currentCondition as keyof typeof WEATHER_IMAGE_MAP];
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  return (
    <main className="flex flex-col w-full gap-8 ">
      <Card className="bg-center bg-[url('/assets/images/bg-today-large.svg')] bg-cover w-full  text-white px-6">
        <CardContent className="w-full">
          <section className="flex flex-col justify-center w-full px-2 sm:flex-row py-14 ">
            {/* city and date */}
            <section className="flex flex-col items-center justify-center w-full gap-2 sm:items-start sm:gap-0">
              <div className="text-3xl font-bold">
                {city.name}, {regionNames.of(city.country)}
              </div>

              <div className="text-foreground opacity-60">
                {formatDate(currentDate)}
              </div>
            </section>

            {/* temperature and condition */}
            <section className="flex items-center justify-center gap-4">
              <div className="relative w-30 h-30">
                <Image
                  src={currentConditionImage}
                  alt={currentCondition}
                  fill={true}
                />
              </div>
              <div className="italic font-semibold text-8xl">
                {currentTemp}°
              </div>
            </section>
          </section>
        </CardContent>
      </Card>

      {/* list of stats */}
      <section className="grid grid-cols-2 gap-4 sm:flex ">
        <StatCard
          title="Feels like"
          value={`${Math.round(currentWeather.feels_like.day)}°C`}
        />
        <StatCard title="Humidity" value={`${currentWeather.humidity}%`} />
        <StatCard
          title="Wind Speed"
          value={`${Math.round(currentWeather.speed * 3.6)} km/h`}
        />
        <StatCard
          title="Precipitation"
          value={`${Math.round(currentWeather.pop * 100)} mm`}
        />
      </section>
    </main>
  );
}
