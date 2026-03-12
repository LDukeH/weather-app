export const getWeatherByCity = async (city: string) => {
  const res = await fetch(`/api/weather/forecast?city=${city}`);

  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  return res.json();
};

export const getHourlyWeatherByCity = async (city: string) => {
  const res = await fetch(`/api/weather/hourly?city=${city}`);

  if (!res.ok) {
    throw new Error("Failed to fetch hourly weather");
  }

  return res.json();
};

export const getSuggestions = async (query: string) => {
  const res = await fetch(`/api/weather/suggest?query=${query}`);

  if (!res.ok) {
    throw new Error("Failed to fetch suggestions");
  }

  return res.json();
};
