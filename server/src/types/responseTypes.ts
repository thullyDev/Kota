import type { Context } from "hono";

export type Data = Record<string, any>;

export type ResponseArgs = {
  c: Context;
  data?: Data;
  message?: string;
};
