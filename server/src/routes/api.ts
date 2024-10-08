import { Hono } from "hono";

const api = new Hono();

api.get("/add", (c) => {
  return c.json({ hello: "world" });
});

export default api;
