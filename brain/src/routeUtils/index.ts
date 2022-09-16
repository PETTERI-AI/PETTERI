import { Hono, Context } from "hono";
import { setupRoutes } from "./resolveRoutes";

export class ExtendedHono extends Hono {
  async makeRoutes() {
    await setupRoutes(this);
  }
}

export type Handler = (c: Context) => Response;
