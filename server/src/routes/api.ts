import { Hono } from "hono";
import { sessionTokenValidator } from "../handlers/sessionTokenMiddleware";
import { badRequestResponse, successfulResponse } from "../handlers/response";
import type { AddDishBody } from "../types/apiTypes";

const api = new Hono();
api.use(sessionTokenValidator);

// api.get("/testing", (c) => {
//   return successfulResponse({ c });
// });

api.post("/add_dish", async (c) => {
	const data = await c.req.json()
	const { dish, ingredients } = data as AddDishBody

	if (!dish || !ingredients) {
		return badRequestResponse({ c, message: "no dish or ingredients data" })
	}

	return successfulResponse({ c, message: "dish was successfully added" })
});
api.post("/dishes", (c) => c.text("POST / dishes"));
api.put("/change_user_name", (c) => c.text("PUT / change_user_name"));
api.put("/change_dish_name", (c) => c.text("PUT / change_dish_name"));
api.put("/add_ingredient", (c) => c.text("PUT / add_ingredient"));
api.delete("/remove_ingredient", (c) => c.text("DELETE / remove_ingredient"));
api.delete("/delete_dish", (c) => c.text("DELETE / remove_ingredient"));

export default api;
