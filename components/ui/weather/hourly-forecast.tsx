"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

import DropDownIcon from "@/public/assets/images/icon-dropdown.svg";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { HourlyWeatherData, HourlyWeather } from "@/weather/weather.types";
import Image from "next/image";

//icon mapping
import { WEATHER_IMAGE_MAP } from "@/weather/weather.map";
import { cn } from "@/lib/utils";

//hourly forecast component
function HourlyCard({
  hourlyWeather,
  timezone,
}: {
  hourlyWeather: HourlyWeather;
  timezone: number;
}) {
  //icon mapping
  const currentCondition = hourlyWeather.weather[0].main;
  const currentConditionImage =
    WEATHER_IMAGE_MAP[currentCondition as keyof typeof WEATHER_IMAGE_MAP];

  const date = new Date((hourlyWeather.dt + timezone) * 1000);
  const formattedHour = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: true,
    timeZone: "UTC",
  }).format(date);

  return (
    <Card variant="popover">
      <CardContent className="flex flex-row items-center justify-between px-4 py-2">
        <section className="flex items-center gap-2">
          <Image
            src={currentConditionImage}
            alt={currentCondition}
            height={40}
            width={40}
          />
          <p>{formattedHour}</p>
        </section>
      </CardContent>
    </Card>
  );
}

export default function HourlyData({
  hourlyWeatherData,
}: {
  hourlyWeatherData: HourlyWeatherData;
}) {
  const [currDate, setCurrDate] = useState<string | null>(null);
  const { list } = hourlyWeatherData || {};
  const timezone = hourlyWeatherData.city.timezone || 0;
  const availableDates = Array.from(
    new Set(
      list.map((item) =>
        new Date((item.dt + timezone) * 1000).toLocaleDateString("en-US", {
          weekday: "long",
        }),
      ),
    ),
  );

  //use this to calculate the currently selected date's data
  //for some reason filtering shouldn't use timezone, so adding it here breaks it
  const currDateData = list.filter((item) => {
    const itemDate = new Date(item.dt * 1000).toLocaleDateString("en-US", {
      weekday: "long",
    });
    return itemDate === currDate;
  });
  console.log(currDateData);

  // set current date to first available date on load
  useEffect(() => {
    if (!currDate && availableDates.length > 0) {
      setCurrDate(availableDates[0]);
    }
  }, [availableDates, currDate]);

  //this shouldn't render if there's no current data so uh yeah
  if (!list) {
    return null;
  }

  return (
    <main>
      <Card size="hourly">
        <CardHeader className="px-4 pt-4 pb-2">
          <section className="flex flex-row items-center justify-between">
            <h2 className="text-lg font-medium text-accent-foreground ">
              Hourly Forecast
            </h2>

            {/* dropdown menu for date */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="popover">
                  <div className="flex flex-row items-center justify-center gap-2 px-1 w-[6rem]">
                    {currDate}
                    <DropDownIcon className="pt-1" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[13rem] rounded-lg">
                {availableDates.map((date) => (
                  <DropdownMenuItem
                    key={date}
                    onSelect={() => setCurrDate(date)}
                    className="items-center justify-center px-4 py-2 text-base font-medium transition-all duration-200 rounded-lg cursor-pointer hover:bg-popover hover:text-accent-foreground"
                  >
                    {date}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </section>
        </CardHeader>

        {/* main content of the hourly forecast */}
        <CardContent
          className={cn(
            "overflow-y-auto h-[36rem]",
            "[&::-webkit-scrollbar]:w-1  [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#302F4A]",
            "[&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-thumb]:border-1 [&::-webkit-scrollbar-thumb]:border-[#3C3B5E]",
          )}
        >
          <section className="flex flex-col gap-4 p-4">
            {currDateData.map((hourlyWeather) => (
              <HourlyCard
                key={hourlyWeather.dt}
                hourlyWeather={hourlyWeather}
                timezone={timezone}
              />
            ))}
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
