import type { Handler } from "@handler";
import { parseWeatherData, getForecastForLatLon } from "@integrations/met.no";

const handler: Handler = async (c) => {
  // Hervanta
  const [lat, lon] = [61.4509, 23.8495];

  const forecast = await getForecastForLatLon(lat, lon);
  const weather = parseWeatherData(forecast);

  return c.json(weather);
};

export default handler;
