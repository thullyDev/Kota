import {
  integer,
  pgTable,
  real,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const UsersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  profile_image_url: varchar({ length: 255 }),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  encrypted_password: varchar({ length: 255 }).notNull(),
  session_token: varchar({ length: 255 }).notNull().unique(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const DishesTable = pgTable("dish", {
  id: serial("id").primaryKey(),
  user_id: serial("user_id")
    .references(() => UsersTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  title: varchar({ length: 255 }).notNull(),
  price: real("price").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const IngredientsTable = pgTable("ingredients", {
  id: serial("id").primaryKey(),
  user_id: serial("user_id")
    .references(() => UsersTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  dish_id: serial("dish_id")
    .references(() => DishesTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  name: varchar({ length: 255 }).notNull(),
  quantity: integer("quantity").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
