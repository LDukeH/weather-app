"use client";

import React, { Suspense } from "react";

import SearchIcon from "@/public/assets/images/icon-search.svg";

import { useState } from "react";
import { useCitySuggestions } from "@/app/hooks/useCitySuggestions";
import { getHourlyWeatherByCity, getWeatherByCity } from "@/services/api";

import useWeatherStore from "@/store/weatherStore";

import { toast } from "react-toastify";
import { toastOptions } from "@/utils";

import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Button } from "./ui/button";
import { useDebounce } from "use-debounce";
import { Item, ItemGroup } from "./ui/item";

import { cn } from "@/lib/utils";

import { AnimatePresence, motion } from "motion/react";

// skeleton for suggestions list
import { SuggestionSkeleton } from "./ui/skeletons/suggestion-skeleton";

interface suggestion {
  name: string;
  country: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const SuggestionsList = ({
  query,
  onSelect,
}: {
  query: string;
  onSelect: (city: string, country: string) => void;
}) => {
  const { suggestions, loading } = useCitySuggestions(query);
  return (
    <ItemGroup
      className={cn(
        "absolute top-full w-full flex flex-col gap-1 p-2 border rounded-lg bg-secondary border-border",
        "transition-all duration-150",
      )}
    >
      {loading && <SuggestionSkeleton />}
      {!loading &&
        suggestions.map((suggestion: suggestion, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: index * 0.03 }}
            onClick={() => {
              onSelect(suggestion.name, suggestion.country);
            }}
          >
            <Item
              size="md"
              className="cursor-pointer hover:bg-popover"
              key={index}
            >
              {suggestion.name}, {suggestion.country}
            </Item>
          </motion.div>
        ))}
      {!loading && suggestions.length === 0 && (
        <div className="p-2 text-sm text-muted-foreground">
          No cities found.
        </div>
      )}
    </ItemGroup>
  );
};

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceSearch] = useDebounce(searchQuery, 300);

  const { setWeatherData, setHourlyWeatherData, setWeatherLoading } =
    useWeatherStore();

  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = async ({ city }: { city: string }) => {
    if (!searchQuery) return;
    try {
      setWeatherLoading(true);

      const [daily, hourly] = await Promise.all([
        getWeatherByCity(city),
        getHourlyWeatherByCity(city),
      ]);

      await delay(1500);

      setWeatherData(daily);
      setHourlyWeatherData(hourly);

      toast.success("Weather data fetched successfully", toastOptions);
    } catch (error) {
      toast.error("Error fetching weather data: " + error, toastOptions);
    } finally {
      setWeatherLoading(false);
    }
  };

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsFocused(false);
      handleSearch({ city: searchQuery });
    }
  };

  const handleSuggestionClick = (city: string, country: string) => {
    setSearchQuery(`${city}, ${country}`);
    handleSearch({ city });
  };

  return (
    <main className="relative flex flex-col w-full gap-4 mx-auto sm:gap-6 sm:flex-row lg:max-w-2xl ">
      <section className="relative flex-1 min-w-0">
        <InputGroup>
          {/* search icon */}
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>

          {/* the input */}
          <InputGroupInput
            placeholder="Search for a place..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            onKeyDown={handleEnter}
          />
        </InputGroup>

        {/* suggestions dropdown */}
        <section className="absolute left-0 z-10 w-full mt-4 top-full">
          {/* this project might use a bit too much library tbh */}
          {/* AnimatePresence for animation */}
          <AnimatePresence>
            {isFocused && debounceSearch && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50, transition: { duration: 0.1 } }}
              >
                <SuggestionsList
                  query={debounceSearch}
                  onSelect={handleSuggestionClick}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </section>

      <Button
        onClick={() => handleSearch({ city: searchQuery })}
        size="xl"
        className="w-full sm:w-auto"
      >
        Search
      </Button>
    </main>
  );
}
