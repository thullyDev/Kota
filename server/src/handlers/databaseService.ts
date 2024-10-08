import type { CreateUser, GetUser, User } from "../types/databaseServiceTypes";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../database/drizzle/schema";
import "dotenv/config";
import { eq } from "drizzle-orm";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
});
const db = drizzle(pool, { schema, logger: true });

export async function getUser({ email }: GetUser): Promise<null | User> {
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
      return null
    }

  return users[0];
}

export async function createUser({
  email,
  name,
  sessionToken,
  encryptedPassword,
  profileImageUrl,
}: CreateUser): Promise<boolean> {
  const user: typeof schema.UsersTable.$inferInsert = {
    name,
    email,
    profile_image_url: profileImageUrl,
    encrypted_password: encryptedPassword,
    session_token: sessionToken,
  };

  try {
    await db.insert(schema.UsersTable).values(user);
  } catch (err: any) {
    if (err.code === "23505") {
      return false;
    }

    throw err;
  }

  return true;
}

// export const UsersTable = pgTable("users", {
//   id: serial("id").primaryKey(),
//   profile_image_url: varchar({ length: 255 }),
//   name: varchar({ length: 255 }).notNull(),
//   email: varchar({ length: 255 }).notNull().unique(),
//   encrypted_password: varchar({ length: 255 }).notNull(),
//   session_token: varchar({ length: 255 }).notNull().unique(),
//   created_at: timestamp("created_at").defaultNow().notNull(),
// });
