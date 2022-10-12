import { ExtendedHono } from "./routeUtils";

const app = new ExtendedHono();
await app.init();

console.log(`Listening on port 3000`);

export default {
  port: 3000,
  fetch: app.fetch,
};
