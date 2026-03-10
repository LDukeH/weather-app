import MainWeatherSkeleton from "./main-weather-skeleton";
import HourlySkeleton from "./hourly-skeleton";
import DailySkeleton from "./daily-skeleton";

export default function WeatherSkeleton() {
  return (
    <main className="flex flex-row gap-8 text-white">
      <section className="flex flex-col gap-8">
        <MainWeatherSkeleton />

        <DailySkeleton />
      </section>

      {/* hourly forecast goes here  */}
      <section className="min-w-md">
        <HourlySkeleton />
      </section>
    </main>
  );
}
