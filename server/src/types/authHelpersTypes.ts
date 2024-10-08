import type { Context } from "hono";
import type { User } from "./databaseServiceTypes";

export type IsValidLogin = {
  user: User | null;
  password: string;
  c: Context;
};

export type IsValidSignup = {
  user: User | null;
  password: string;
  confirm: string;
  c: Context;
};
