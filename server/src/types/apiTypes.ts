import type { Context } from "hono";

export type AddDishBody = {
  user_id?: number;
  price?: number;
  title: string;
  ingredients?: Ingredients[];
};

export type DishesBody = { user_id: number };

export type DishData = {
  user_id: number;
  title: string;
  price: number;
  ingredients: Ingredients[];
};

export type Dish = {
  user_id: number;
  title: string;
  price: number;
  id: number;
};

export type Ingredients = {
  name: string;
  user_id: number;
  dish_id: number;
  quantity: number;
};

export type CxtAndMsg = {
  c: Context;
  message: string;
};

export type ChangeUserNameBody = {
  name?: string;
  user_id?: number;
};

export type ChangeDishTitleBody = {
  user_id?: number;
  dish_id?: number;
  title?: string;
};

export type DeleteDishBody = {
  user_id?: number;
  dish_id?: number;
};

export type AddIngredientBody = {
  user_id?: number;
  dish_id?: number;
  name?: string;
  quantity?: number;
};

export type RemoveIngredientBody = {
  user_id?: number;
  dish_id?: number;
  ing_id?: number;
};
