"use client";

import React from "react";

import SearchIcon from "@/public/assets/images/icon-search.svg";

import { useState } from "react";
import { getHourlyWeatherByCity, getWeatherByCity } from "@/services/api";

import useWeatherStore from "@/store/weatherStore";

import { toast } from "react-toastify";
import { toastOptions } from "@/utils";

import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Button } from "./ui/button";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const { setWeatherData, setHourlyWeatherData } = useWeatherStore();

  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const [daily, hourly] = await Promise.all([
        getWeatherByCity(searchQuery),
        getHourlyWeatherByCity(searchQuery),
      ]);

      setWeatherData(daily);
      setHourlyWeatherData(hourly);

      toast.success("Weather data fetched successfully", toastOptions);
    } catch (error) {
      toast.error("Error fetching weather data: " + error, toastOptions);
    }
  };

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex w-full max-w-2xl gap-8 mx-auto ">
      <InputGroup>
        {/* search icon */}
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>

        {/* the input */}
        <InputGroupInput
          placeholder="Search for a place..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleEnter}
        />
      </InputGroup>

      <Button onClick={handleSearch} size="xl">
        Search
      </Button>
    </div>
  );
}
