import { Hono, type Context } from "hono";
import { sessionTokenValidator } from "../handlers/sessionTokenMiddleware";
import {
  badRequestResponse,
  crashResponse,
  successfulResponse,
} from "../handlers/response";
import type {
  AddDishBody,
  ChangeUserNameBody,
  CxtAndMsg,
  DishData,
  DishesBody,
} from "../types/apiTypes";
import { isAddDishRequestValid, isChangeDishTitleRequestBodyValid, isChangeUserNameRequestBodyValid } from "../handlers/apiHelpers";
import { addDish, getUserDishes, updateUserName } from "../handlers/databaseService";
import type { UpdateUserName } from "../types/databaseServiceTypes";

const api = new Hono();
api.use(sessionTokenValidator);

// api.get("/testing", (c) => {
//   return successfulResponse({ c });
// });

api.post("/add_dish", async (c) => {
  const data = await c.req.json();
  const { user_id, dish, ingredients } = data as AddDishBody;
  const [isValid, message] = isAddDishRequestValid({
    user_id,
    dish,
    ingredients,
  });

  if (isValid == false) {
    return badRequestResponse({ c, message } as CxtAndMsg);
  }
  const dishData = { user_id, dish, ingredients } as DishData;
  const dishId = addDish(dishData); // Todo: implement this later

  if (dishId == null) {
    return crashResponse({ c, message: "database failed to add dish " });
  }

  return successfulResponse({
    c,
    message: "dish was successfully added",
    data: {
      dish_id: dishId,
    },
  });
});

api.post("/dishes", async (c) => {
  const data = await c.req.json();
  const { user_id } = data as DishesBody;

  if (!user_id) {
    return badRequestResponse({ c, message: "no user_id" });
  }

  const dishes = getUserDishes(user_id); // Todo: implement this later

  return successfulResponse({
    c,
    message: "successfully got the dishes",
    data: {
      dishes,
    },
  });
});

api.put("/change_user_name", async (c) => {
  const data: ChangeUserNameBody = await c.req.json();
  const { user_id, name } = data;
  const [isValid, message] = isChangeUserNameRequestBodyValid(data);

  if (isValid == false) {
    return badRequestResponse({ c, message } as CxtAndMsg);
  }

  const response = updateUserName({ user_id, name } as UpdateUserName); // Todo: implement this later

  if (response == false) {
  	return crashResponse({ c, message: "db failed to change user name"})
  }

  return successfulResponse({
    c,
    message: "successfully changed user name",
  });
});

api.put("/change_dish_title", async (c) => {
  const data: ChangeDishTitleBody = await c.req.json();
  const { user_id, title } = data;
  const [isValid, message] = isChangeDishTitleRequestBodyValid(data);

  if (isValid == false) {
    return badRequestResponse({ c, message } as CxtAndMsg);
  }

  const dishes = updateDishName({ user_id, title }); // Todo: implement this later

  return successfulResponse({
    c,
    message: "successfully got the dishes",
    data: {
      dishes,
    },
  });
});

api.delete("/delete_dish", async (c) => {
  const data: DeleteDishBody = await c.req.json();
  const { user_id, dish_id } = data;
  const [isValid, message] = isDeleteRequestBodyValid(data);

  if (isValid == false) {
    return badRequestResponse({ c, message } as CxtAndMsg);
  }

  const dishes = updateDishName({ user_id, dish_id }); // Todo: implement this later

  return successfulResponse({
    c,
    message: "successfully deleted the dishes",
    data: {
      dishes,
    },
  });
});


api.put("/add_ingredient", async (c) => {
  const data: AddIngredientBody = await c.req.json();
  const { user_id, dish_id, name } = data;
  const [isValid, message] = isAddIngredientBodyValid(data);

  if (isValid == false) {
    return badRequestResponse({ c, message } as CxtAndMsg);
  }

  const dishes = addIngredeint({ user_id, dish_id, name }); // Todo: implement this later

  return successfulResponse({
    c,
    message: "successfully added ingredient",
    data: {
      dishes,
    },
  });
});


api.delete("/remove_ingredient", async (c) => {
  const data: RemoveIngredientBody = await c.req.json();
  const { user_id, dish_id,  ing_id } = data;
  const [isValid, message] = isRemoveIngredientBodyValid(data);

  if (isValid == false) {
    return badRequestResponse({ c, message } as CxtAndMsg);
  }

  const dishes = removeIngredient({ user_id, dish_id, ing_id }); // Todo: implement this later

  return successfulResponse({
    c,
    message: "successfully removed the ingredient",
    data: {
      dishes,
    },
  });
});

export default api;
