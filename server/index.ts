import { Hono } from "hono";
import apiRouter from "./src/routes/api";
import authRouter from "./src/routes/auth";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

const app = new Hono();

app.use(logger());
app.use(cors()); // TODO: implement the proper cors later

app.get("/", (c) => c.text("server by github@thullyDev"));

app.route("/api", apiRouter);

app.route("/auth", authRouter);

Bun.serve({
  fetch: app.fetch,
  port: 3000,
});
