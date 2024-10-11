import type { Context } from "hono";

export type AddDishBody = {
  user_id?: number;
  dish?: Dish;
  ingredients?: Ingredients[];
};

export type DishesBody = { user_id: number };

export type DishData = {
  user_id: number;
  dish: Dish;
  ingredients: Ingredients[];
};

export type Dish = {
  title: string;
  price: number;
};

export type Ingredients = {
  name: string;
  quantity: number;
};

export type CxtAndMsg = {
  c: Context;
  message: string;
};


export type ChangeUserNameBody = {
  name?: string,
  user_id?: number,
}

export type ChangeDishTitleBody = { 
  user_id: number, 
  dish_id: number, 
  title: string, 
}