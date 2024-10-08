import { Hono } from "hono";
import apiRouter from "./src/routes/api";
import authRouter from "./src/routes/auth";
import { logger } from "hono/logger";
import { getUser } from "./src/handlers/databaseService";

const app = new Hono();

app.use(logger());

app.get("/", (c) => {
  // createUser({ email: "", name: "", sessionToken: "", encryptedPassword: "", profileImageUrl: "" })
  const user = getUser({ email: "john.doe@example.com" })
  return c.text("server by github@thullyDev");
});

app.route("/api", apiRouter);

app.route("/auth", authRouter);

Bun.serve({
  fetch: app.fetch,
  port: 3000,
});
