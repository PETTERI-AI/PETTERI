import type { Handler } from "@handler";

const handler: Handler = async (c) => {
  // Hervanta
  const [lat, lon] = [61.4509, 23.8495];

  const baseUrl = "https://api.met.no/weatherapi/nowcast/2.0/complete";
  const url = `${baseUrl}?lat=${lat}&lon=${lon}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "petteri/brain/0.0 github.com/PETTERI-AI",
    },
  });

  const json = await res.json();

  return c.json(json);
};

export default handler;
