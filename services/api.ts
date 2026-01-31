const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const geoCoding = async (city: string) => {
  const endpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
  try {
    const response = await fetch(endpoint);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    throw error;
  }
};

export const getWeatherByCity = async (city: string) => {
  const geoData = await geoCoding(city);
  if (!geoData || geoData.length === 0) {
    throw new Error("City not found");
  }

  const { lat, lon, country } = geoData[0];

  const endpoint = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(endpoint);

    const data = await response.json();
    data.city.country = country;
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Error fetching weather data");
  }
};

export const getHourlyWeatherByCity = async (city: string) => {
  const geoData = await geoCoding(city);
  if (!geoData || geoData.length === 0) {
    throw new Error("City not found");
  }

  const { lat, lon, country } = geoData[0];

  const endpoint = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  try {
    const response = await fetch(endpoint);

    const data = await response.json();
    data.city.country = country;
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Error fetching weather data");
  }
};
