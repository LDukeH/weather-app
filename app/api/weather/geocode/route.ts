export async function GET(req: Request) {
  const API_KEY = process.env.WEATHER_API_KEY;

  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  const endpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

  const res = await fetch(endpoint);
  const data = await res.json();

  return Response.json(data);
}
