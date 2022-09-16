import { readdir } from "node:fs/promises";
import { extname } from "node:path";
import { type Hono } from "hono";

async function readDir(path: string) {
  return await readdir(path, { withFileTypes: true });
}

function getRouteFromPath(path: string) {
  return path.split("api/")[1].split(".")[0];
}

export async function resolveRoutes(path: string) {
  const files = await readDir(path);
  const routes: string[] = [];

  for (const file of files) {
    const absolutePath = `${path}/${file.name}`;

    if (file.isDirectory()) {
      const subRoutes = await resolveRoutes(absolutePath);
      routes.push(...subRoutes);
      continue;
    }

    if (extname(file.name) !== ".ts") continue;

    const route = getRouteFromPath(absolutePath);
    routes.push(route);
  }

  return routes;
}

export async function setupRoutes(app: Hono) {
  const routes = await resolveRoutes("src/api");

  routes.forEach(async (route) => {
    const handler = (await import(`../api/${route}`)).default;
    app.all("api/" + route, (c) => handler(c));
  });
}
