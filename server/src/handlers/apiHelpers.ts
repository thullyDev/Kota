import type { IsAddDishRequestValid, IsChangeUserNameRequestBodyValid } from "../types/apiHelpersTypes";
import type { ChangeDishTitleBody } from "../types/apiTypes";

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

export function isChangeDishTitleRequestBodyValid({ user_id, dish_id, title }: ChangeDishTitleBody) {
  if (!user_id) {
    return [false, "no user_id"];
  }

  if (!dish_id) {
    return [false, "no dish_id"];
  }

  if (!title) {
    return [false, "no title"];
  }

  return [true, null]
}
