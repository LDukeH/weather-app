export async function GET(req: Request) {
  const API_KEY = process.env.WEATHER_API_KEY;

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  const endpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`;

  const res = await fetch(endpoint);
  const data = await res.json();

  return Response.json(data);
}
