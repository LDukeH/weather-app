"use client";

import React from "react";

import SearchIcon from "@/public/assets/images/icon-search.svg";

import { useState } from "react";
import { getWeatherByCity } from "@/services/api";

import useWeatherStore from "@/store/weatherStore";

import { toast } from "react-toastify";
import { toastOptions } from "@/utils";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const { setWeatherData } = useWeatherStore();

  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const data = await getWeatherByCity(searchQuery);
      setWeatherData(data);
      toast.success("Weather data fetched successfully", toastOptions);
    } catch (error) {
      toast.error("Error fetching weather data", toastOptions);
    }
  };

  const handleEnter = async (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex mx-auto gap-4 w-full justify-center">
      <label
        htmlFor="search"
        className="flex items-center gap-4 w-xl bg-neutral-800 h-12 px-6 rounded-xl"
      >
        <SearchIcon />
        <input
          type="text"
          placeholder="Search for a place..."
          name="search"
          className="text-white w-full focus:outline-none"
          id="search"
          value={searchQuery}
          onKeyDown={handleEnter}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </label>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white py-2 px-6 rounded-xl h-12 cursor-pointer hover:brightness-120 transition-all duration-300 "
      >
        Search
      </button>
    </div>
  );
}
