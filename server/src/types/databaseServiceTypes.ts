import type { eq, SQL } from "drizzle-orm";

export type GetUser = {
  email: string | undefined | null;
};

export type CreateUser = {
  name: string;
  email: string;
  sessionToken: string;
  encryptedPassword: string;
  profileImageUrl: string;
};

export type User = {
  id: number;
  profile_image_url: string | null;
  name: string;
  email: string;
  encrypted_password: string;
  session_token: string;
  created_at: string | Date;
};

export type UpdateSessionToken = {
  email: string;
  sessionToken: string;
};

export type UpdateUser = {
  data: Record<string, any>;
  equalTo: SQL<unknown>;
};

export type UpdateUserName = {
  name: string;
  user_id: number;
};

export type UpdateDishName = {
  title: string;
  dish_id: number;
  user_id: number;
};

export type AddIngredient = { user_id: number; dish_id: number; name: string };

export type DeleteDish = { user_id: number; dish_id: number };

export type RemoveIngredient = {
  user_id: number;
  dish_id: number;
  ing_id: number;
};
