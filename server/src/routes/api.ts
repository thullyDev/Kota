import { Hono } from "hono";
import { sessionTokenValidator } from "../handlers/sessionTokenMiddleware";

const api = new Hono();
api.use(sessionTokenValidator);

api.get("/testing", (c) => c.text("POST / testing"));
api.post("/dishes", (c) => c.text("POST / dishes"));
api.put("/change_user_name", (c) => c.text("PUT / change_user_name"));
api.put("/change_dish_name", (c) => c.text("PUT / change_dish_name"));
api.post("/add_dish", (c) => c.text("POST / add_dish"));
api.put("/add_ingredient", (c) => c.text("PUT / add_ingredient"));
api.delete("/remove_ingredient", (c) => c.text("DELETE / remove_ingredient"));
api.delete("/delete_dish", (c) => c.text("DELETE / remove_ingredient"));

export default api;
