import { Hono } from 'hono';
import apiRouter from "./src/routes/apiRouter"
import authRouter from "./src/routes/apiRouter"

const app = new Hono();

app.get('/', (c) => c.text('Hello Hono!'));

app.route("/api", apiRouter)

app.route("/auth", authRouter)

Bun.serve({
	fetch: app.fetch,
	port: 3000,
})