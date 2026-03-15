export async function GET(req: Request) {
  const API_KEY = process.env.WEATHER_API_KEY;

  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  const geoEndpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
  const geoRes = await fetch(geoEndpoint);
  const geoData = await geoRes.json();

  if (!geoData || geoData.length === 0) {
    return Response.json({ error: "City not found" }, { status: 404 });
  }

  const { lat, lon, name, country } = geoData[0];

  const weatherEndpoint = `https://api.open-meteo.com/v1/forecast
?latitude=${lat}
&longitude=${lon}
&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m
&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max
&timezone=auto`;

  const weatherRes = await fetch(weatherEndpoint);
  const weatherData = await weatherRes.json();
  weatherData.city = { name, country, lat, lon };

  return Response.json(weatherData);
}
