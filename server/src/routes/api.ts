import { Hono } from "hono";
import { sessionTokenValidator } from "../handlers/sessionTokenMiddleware";
import {
  badRequestResponse,
  crashResponse,
  notFoundResponse,
  successfulResponse,
} from "../handlers/response";
import type {
  AddDishBody,
  AddIngredientBody,
  ChangeDishTitleBody,
  ChangeUserNameBody,
  CxtAndMsg,
  DeleteDishBody,
  DishData,
  DishesBody,
  RemoveIngredientBody,
} from "../types/apiTypes";
import {
  isAddDishRequestValid,
  isAddIngredientBodyValid,
  isChangeDishTitleRequestBodyValid,
  isChangeUserNameRequestBodyValid,
  isDeleteRequestBodyValid,
  isRemoveIngredientBodyValid,
} from "../handlers/apiHelpers";
import {
  addDish,
  addIngredient,
  deleteDish,
  getUserDishes,
  removeIngredient,
  updateDishName,
  updateUserName,
} from "../handlers/databaseService";
import type {
  AddIngredient,
  DeleteDish,
  RemoveIngredient,
  UpdateDishName,
  UpdateUserName,
} from "../types/databaseServiceTypes";

const api = new Hono();
api.use(sessionTokenValidator);

api.post("/add_dish", async (c) => {
  const data: AddDishBody = await c.req.json();
  const { user_id, title, price, ingredients } = data;
  const [isValid, message] = isAddDishRequestValid(data);

  if (isValid == false) {
    return badRequestResponse({ c, message } as CxtAndMsg);
  }
  const dishData = { user_id, title, price, ingredients } as DishData;
  const dishId = await addDish(dishData);

  if (dishId == null) {
    return notFoundResponse({ c, message: "database failed to add dish, user_id does not found" });
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

  const dishes = await getUserDishes(user_id);

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

  const response = await updateUserName({ user_id, name } as UpdateUserName);

  if (response == false) {
    return notFoundResponse({
      c,
      message:
        "db failed to change user name, probably because user_id not found",
    });
  }

  return successfulResponse({
    c,
    message: "successfully changed user name",
  });
});

api.put("/change_dish_title", async (c) => {
  const data: ChangeDishTitleBody = await c.req.json();
  const { user_id, dish_id, title } = data;
  const [isValid, message] = isChangeDishTitleRequestBodyValid(data);

  if (isValid == false) {
    return badRequestResponse({ c, message } as CxtAndMsg);
  }

  const response = await updateDishName({
    user_id,
    dish_id,
    title,
  } as UpdateDishName);

  if (!response) {
    return notFoundResponse({ c, message: "unable to update dish title, user_id or dish_id not found" });
  }

  return successfulResponse({
    c,
    message: "successfully changed the dish title",
  });
});

api.delete("/delete_dish", async (c) => {
  const data: DeleteDishBody = await c.req.json();
  const { user_id, dish_id } = data;
  const [isValid, message] = isDeleteRequestBodyValid(data);

  if (isValid == false) {
    return badRequestResponse({ c, message } as CxtAndMsg);
  }

  const response = await deleteDish({ user_id, dish_id } as DeleteDish);

  if (!response) {
    return notFoundResponse({ c, message: "unable to delete disht, user_id or dish_id not found" });
  }

  return successfulResponse({
    c,
    message: "successfully deleted the dishes",
  });
});

api.put("/add_ingredient", async (c) => {
  const data: AddIngredientBody = await c.req.json();
  const { user_id, dish_id, name, quantity } = data;
  const [isValid, message] = isAddIngredientBodyValid(data);

  if (isValid == false) {
    return badRequestResponse({ c, message } as CxtAndMsg);
  }

  const response = await addIngredient({
    user_id,
    dish_id,
    name,
    quantity,
  } as AddIngredient);

  if (!response) {
    return notFoundResponse({ c, message: "unable to add ingredient, user_id or dish_id not found" });
  }

  return successfulResponse({
    c,
    message: "successfully added ingredient",
  });
});

api.delete("/remove_ingredient", async (c) => {
  const data: RemoveIngredientBody = await c.req.json();
  const { user_id, dish_id, ing_id } = data;
  const [isValid, message] = isRemoveIngredientBodyValid(data);

  if (isValid == false) {
    return badRequestResponse({ c, message } as CxtAndMsg);
  }

  const response = await removeIngredient({
    user_id,
    dish_id,
    ing_id,
  } as RemoveIngredient);

  if (!response) {
    return notFoundResponse({
      c,
      message:
        "unable to remove ingredient, could be user_id, dish_id or ing_id not found",
    });
  }

  return successfulResponse({
    c,
    message: "successfully removed the ingredient",
  });
});

export default api;
