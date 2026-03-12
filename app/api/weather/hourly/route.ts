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

  const { lat, lon, country } = geoData[0];

  const endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const res = await fetch(endpoint);
  const data = await res.json();

  data.city.country = country;

  return Response.json(data);
}
