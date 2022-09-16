// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseWeatherData = (data: Record<string, any>) => {
  const weather = data["properties"].timeseries[0].data;
  // TODO: define a (partial) type from schema
  // TODO: define better data requirements for actual usage
  return {
    temperature: weather.instant.details.air_temperature,
    nextHour: weather.next_1_hours.summary.symbol_code,
    dataSource: {
      name: "Norwegian Meteorological Institute",
      license: "https://api.met.no/doc/License",
    },
  };
};

const getForecastForLatLon = async (lat: number, lon: number) => {
  const baseUrl = "https://api.met.no/weatherapi/nowcast/2.0/complete";
  const url = baseUrl + `?lat=${lat}&lon=${lon}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "petteri/brain/0.0 github.com/PETTERI-AI",
    },
  });

  return await res.json();
};

export { parseWeatherData, getForecastForLatLon };
