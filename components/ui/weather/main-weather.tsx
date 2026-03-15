import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OpenMeteoWeatherData } from "@/weather/weather.types";
import Image from "next/image";

//icon mapping
import { WEATHER_IMAGE_MAP, mapWeatherCode } from "@/weather/weather.map";

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
  weatherData: OpenMeteoWeatherData;
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

  //get weather data for current day
  console.log(weatherData);
  const currentWeather = weatherData.current;
  const city = weatherData.city;

  if (!currentWeather) return;

  const currentDate = new Date(currentWeather?.time);
  const currentTemp = Math.round(currentWeather?.temperature_2m);

  console.log(currentDate, currentTemp);
  //get current condition and image
  const currentCondition = mapWeatherCode(currentWeather?.weather_code);
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
          value={`${Math.round(currentWeather.apparent_temperature)}°C`}
        />
        <StatCard
          title="Humidity"
          value={`${currentWeather.relative_humidity_2m}%`}
        />
        <StatCard
          title="Wind Speed"
          value={`${Math.round(currentWeather.wind_speed_10m)} km/h`}
        />
        <StatCard
          title="Precipitation"
          value={`${Math.round(currentWeather.precipitation * 100)} mm`}
        />
      </section>
    </main>
  );
}
