// src/lib/weather-icon-map.ts

export function mapWeatherCode(code: number): keyof typeof WEATHER_IMAGE_MAP {
  if (code === 0) return "Clear";

  if (code === 1 || code === 2) return "Clear";

  if (code === 3) return "Clouds";

  if (code === 45 || code === 48) return "Fog";

  if (code >= 51 && code <= 57) return "Drizzle";

  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return "Rain";

  if (code >= 71 && code <= 77) return "Snow";

  if (code >= 95) return "Thunderstorm";

  return "Clouds";
}

export const WEATHER_IMAGE_MAP = {
  Clear: "/assets/images/icon-partly-cloudy.webp",

  Clouds: "/assets/images/icon-overcast.webp",

  Rain: "/assets/images/icon-rain.webp",
  Drizzle: "/assets/images/icon-drizzle.webp",

  Thunderstorm: "/assets/images/icon-storm.webp",

  Snow: "/assets/images/icon-snow.webp",

  Mist: "/assets/images/icon-fog.webp",
  Smoke: "/assets/images/icon-fog.webp",
  Haze: "/assets/images/icon-fog.webp",
  Fog: "/assets/images/icon-fog.webp",

  Dust: "/assets/images/icon-windy.svg",
  Sand: "/assets/images/icon-windy.svg",
  Ash: "/assets/images/icon-windy.svg",
  Squall: "/assets/images/icon-windy.svg",

  Tornado: "/assets/images/icon-windy.svg",
} as const;
