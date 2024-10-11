import { Hono } from "hono";
import apiRouter from "./src/routes/api";
import authRouter from "./src/routes/auth";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { ORIGINS } from "./src/utilities/config";

const app = new Hono();
app.use(logger());
app.use(cors({
  allowMethods: [ "GET", "POST", "PUT", "DELETE"],
  allowHeaders: [
    'Content-Type',
    'Authorization',
    'email',          
    'session_token'
  ],
  origin: ORIGINS.split(",") // ["*"] or ["domain"]
})); 

app.get("/", (c) => c.text("server by github@thullyDev"));

app.route("/api", apiRouter);

app.route("/auth", authRouter);

Bun.serve({
  fetch: app.fetch,
  port: 3000,
});
