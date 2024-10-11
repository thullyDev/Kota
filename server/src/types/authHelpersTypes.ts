import type { User } from "./databaseServiceTypes";

export type IsValidLogin = {
  user: User | null;
  password: string;
};

export type IsValidSignup = {
  user: User | null;
  password: string;
  confirm: string;
};
