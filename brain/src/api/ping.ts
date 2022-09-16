import { type Handler } from "../routeUtils";

const handler: Handler = (c) => {
  console.log(c.req);
  c.status(200);
  return c.text("pong");
};

export default handler;
