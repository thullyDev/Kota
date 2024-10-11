import type {
  IsAddDishRequestValid,
  IsChangeUserNameRequestBodyValid,
} from "../types/apiHelpersTypes";
import type {
  AddIngredientBody,
  ChangeDishTitleBody,
  DeleteDishBody,
} from "../types/apiTypes";

export function isAddDishRequestValid({
  user_id,
  dish,
  ingredients,
}: IsAddDishRequestValid) {
  if (!user_id) {
    return [false, "no user_id"];
  }

  if (!dish) {
    return [false, "no dish"];
  }

  if (!ingredients) {
    // undefined or is empty
    return [false, "no ingredients data"];
  }

  return [true, null];
}

export function isChangeUserNameRequestBodyValid({
  user_id,
  name,
}: IsChangeUserNameRequestBodyValid) {
  if (!user_id) {
    return [false, "no user_id"];
  }

  if (!name) {
    return [false, "no name"];
  }

  return [true, null];
}

export function isChangeDishTitleRequestBodyValid({
  user_id,
  dish_id,
  title,
}: ChangeDishTitleBody) {
  if (!user_id) {
    return [false, "no user_id"];
  }

  if (!dish_id) {
    return [false, "no dish_id"];
  }

  if (!title) {
    return [false, "no title"];
  }

  return [true, null];
}

export function isDeleteRequestBodyValid({ user_id, dish_id }: DeleteDishBody) {
  if (!user_id) {
    return [false, "no user_id"];
  }

  if (!dish_id) {
    return [false, "no dish_id"];
  }

  return [true, null];
}

export function isAddIngredientBodyValid({
  user_id,
  dish_id,
  name,
}: AddIngredientBody) {
  if (!user_id) {
    return [false, "no user_id"];
  }

  if (!dish_id) {
    return [false, "no dish_id"];
  }

  if (!name) {
    return [false, "no name"];
  }

  return [true, null];
}

export function isRemoveIngredientBodyValid({
  user_id,
  dish_id,
  ing_id,
}: RemoveIngredientBody) {
  if (!user_id) {
    return [false, "no user_id"];
  }

  if (!dish_id) {
    return [false, "no dish_id"];
  }

  if (!ing_id) {
    return [false, "no ingredient id"];
  }

  return [true, null];
}
