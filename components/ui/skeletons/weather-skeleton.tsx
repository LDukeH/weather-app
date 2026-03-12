import MainWeatherSkeleton from "./main-weather-skeleton";
import HourlySkeleton from "./hourly-skeleton";
import DailySkeleton from "./daily-skeleton";

export default function WeatherSkeleton() {
  return (
    <main className="flex flex-col w-full gap-8 text-white lg:flex-row">
      <section className="flex flex-col lg:max-w-5xl gap-3 lg:flex-[2]">
        <MainWeatherSkeleton />

        <DailySkeleton />
      </section>

      {/* hourly forecast goes here  */}
      <section className="flex flex-col flex-1 gap-8 lg:flex-[1]">
        <HourlySkeleton />
      </section>
    </main>
  );
}
