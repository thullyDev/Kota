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
import { eq } from "drizzle-orm";
import type { DishData } from "../types/apiTypes";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
});
const db = drizzle(pool, { schema, logger: true });

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
  } = schema.UsersTable;
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
    .from(schema.UsersTable)
    .where(eq(schema.UsersTable.email, email));

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
  const user: typeof schema.UsersTable.$inferInsert = {
    name,
    email,
    profile_image_url: profileImageUrl,
    encrypted_password: encryptedPassword,
    session_token: sessionToken,
  };
  let id = null;

  try {
    const result = await db
      .insert(schema.UsersTable)
      .values(user)
      .returning({ id: schema.UsersTable.id });
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
  const equalTo = eq(schema.UsersTable.email, email);
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
    .update(schema.UsersTable)
    .set(data)
    .where(equalTo);

  if (!rowCount)
    // 0 or null
    return false;

  return true;
}

export async function addDish(dishData: DishData): Promise<null | number> {
  // return the dish_id or null if failed
  throw new Error("Function not implemented.");
}

export function getUserDishes(user_id: number) {
  throw new Error("Function not implemented.");
}

export function updateUserName({ user_id, name }: UpdateUserName) {
  throw new Error("Function not implemented.");
}

export function updateDishName({ user_id, title }: UpdateDishName) {
  throw new Error("Function not implemented.");
}

export function deleteDish({ user_id, dish_id }: DeleteDish) {
  throw new Error("Function not implemented.");
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
