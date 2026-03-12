import { Card, CardContent, CardHeader, CardTitle } from "../card";

const status = ["Feels Like", "Humidity", "Wind", "Precipitation"];

function LoadingDots() {
  return (
    <div className="flex gap-3">
      <div className="inline-block w-3 h-3 bg-white rounded-full animate-[bounceHigh_1s_infinite]"></div>
      <div className="w-3 h-3 animate-[bounceHigh_1s_infinite_0.2s] bg-white inline-block rounded-full"></div>
      <div className="w-3 h-3 animate-[bounceHigh_1s_infinite_0.4s] bg-white rounded-full inline-block"></div>
    </div>
  );
}

export default function MainWeatherSkeleton() {
  return (
    <section className="flex flex-col gap-8 ">
      {/* main weather card */}
      <Card className="max-w-4xl flex justify-center text-white px-6 min-h-[242px]">
        <CardContent className="w-full h-full">
          <section className="flex flex-col items-center justify-center h-full gap-2">
            <LoadingDots />
            <div className="text-lg font-medium">Loading...</div>
          </section>
        </CardContent>
      </Card>

      {/* stats skeleton */}
      <section className="grid grid-cols-2 gap-4 sm:flex ">
        {status.map((stat, i) => {
          return (
            <Card size="medium" key={i} className="gap-6 p-5">
              <CardHeader className="text-lg text-muted-foreground">
                <CardTitle>{stat}</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl">–</CardContent>
            </Card>
          );
        })}
      </section>
    </section>
  );
}
