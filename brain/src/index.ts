import { Hono } from "hono";

const app = new Hono();

app.get("/", (context) => context.text("Hello dad"));

export default {
  port: 3000,
  fetch: app.fetch,
};
