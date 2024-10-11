import type {
  AddIngredient,
  CreateUser,
  DeleteDish,
  GetUser,
  RemoveIngredient,
  UpdateDishName,
  UpdateSessionToken,
  UpdateUser,
  UpdateUserName,
  User,
} from "../types/databaseServiceTypes";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../database/drizzle/schema";
import "dotenv/config";
import { and, eq } from "drizzle-orm";
import type { Dish, DishData } from "../types/apiTypes";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
});
const db = drizzle(pool, { schema, logger: true });
const { UsersTable, DishesTable, IngredientsTable } = schema

export async function getUser({ email }: GetUser): Promise<null | User> {
  if (!email) return null;

  const {
    id,
    name,
    email: useremail,
    profile_image_url,
    encrypted_password,
    session_token,
    created_at,
  } = UsersTable;
  const users = await db
    .select({
      id,
      email: useremail,
      name,
      profile_image_url,
      encrypted_password,
      session_token,
      created_at,
    })
    .from(UsersTable)
    .where(eq(UsersTable.email, email));

  if (users.length == 0) {
    return null;
  }

  return users[0];
}

export async function createUser({
  email,
  name,
  sessionToken,
  encryptedPassword,
  profileImageUrl,
}: CreateUser): Promise<number | null> {
  const user: typeof UsersTable.$inferInsert = {
    name,
    email,
    profile_image_url: profileImageUrl,
    encrypted_password: encryptedPassword,
    session_token: sessionToken,
  };
  let id = null;

  try {
    const result = await db
      .insert(UsersTable)
      .values(user)
      .returning({ id: UsersTable.id });
    id = result.length ? result[0].id : null;
  } catch (err: any) {
    if (err.code === "23505") {
      return null;
    }

    throw err;
  }

  return id;
}

export async function updateSessionToken({
  email,
  sessionToken,
}: UpdateSessionToken): Promise<boolean> {
  const data = { session_token: sessionToken };
  const equalTo = eq(UsersTable.email, email);
  return updateUser({
    data,
    equalTo,
  });
}

export async function updateUser({
  data,
  equalTo,
}: UpdateUser): Promise<boolean> {
  const { rowCount } = await db
    .update(UsersTable)
    .set(data)
    .where(equalTo);

  if (!rowCount)
    // 0 or null
    return false;

  return true;
}

export async function addDish({ title, user_id, price, ingredients }: DishData): Promise<null | number> {
  const dish: typeof DishesTable.$inferInsert = {
    title,
    user_id,
    price,
  };


  try {
    let result = await db
      .insert(DishesTable)
      .values(dish)
      .returning({ id: DishesTable.id });
    const id = result.length ? result[0].id : null;

    if (id == null) {
      return null
    }


    ingredients = ingredients.map((value) => {
      value["user_id"] = user_id
      value["dish_id"] = id

      return value
    })


    result = await db
      .insert(IngredientsTable)
      .values(ingredients)
      .returning({ id: IngredientsTable.id });

    if (!result.length) {
      return null
    }

    return id
  } catch (err: any) {
    console.log(err)
    return null
  }
}

export async function getUserDishes(user_id: number): Promise<Dish[]> {
    const dishes = await db
    .select({
      id: DishesTable.id,
      user_id: DishesTable.user_id,
      price: DishesTable.price,
      title: DishesTable.title,
    })
    .from(DishesTable)
    .where(eq(DishesTable.user_id, user_id));

    return dishes 
}

export async function updateUserName({ user_id, name }: UpdateUserName) {
  const data = { name };
  const equalTo = eq(UsersTable.id, user_id);
  return updateUser({
    data,
    equalTo,
  });
}

export async function updateDishName({ user_id, dish_id, title }: UpdateDishName) {
  const { rowCount } = await db
  .update(DishesTable)
  .set({ title })
  .where(
    and(
      eq(DishesTable.user_id, user_id),
      eq(DishesTable.id, dish_id),
    )
  )

  if (!rowCount)
    // 0 or null
    return false;

  return true;
}

export async function deleteDish({ user_id, dish_id }: DeleteDish) {
  const { rowCount } = await db
  .delete(DishesTable)
  .where(
    and(
      eq(DishesTable.user_id, user_id),
      eq(DishesTable.id, dish_id),
    )
  )

  if (!rowCount)
    // 0 or null
    return false;

  return true;
}

export function addIngredient({ user_id, dish_id, name }: AddIngredient) {
  throw new Error("Function not implemented.");
}

export function removeIngredient({
  user_id,
  dish_id,
  ing_id,
}: RemoveIngredient) {
  throw new Error("Function not implemented.");
}
