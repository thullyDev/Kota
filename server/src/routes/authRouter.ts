import { Hono } from "hono";

const auth = new Hono()

auth.get("/login", (c) => {
	return c.json({ hello: "world" })
})

export default auth