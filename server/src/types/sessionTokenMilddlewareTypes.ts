import type { Context } from "hono";

export type IsSessionTokenValid = {
  email: string | undefined;
  encryptedSessionToken: string | undefined;
  c: Context;
};
