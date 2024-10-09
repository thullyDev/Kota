import type { Context, Next } from "hono";
import { getUser } from "./databaseService";
import type { IsSessionTokenValid } from "../types/sessionTokenMilddlewareTypes";
import { badRequestResponse, forbiddenResponse } from "./response";
import { decrypt, encrypt, generateUniqueToken } from "../utilities/misc";

export const sessionTokenValidator = async (c: Context, next: Next) => {
  const session_token = c.req.header("session_token");
  const email = c.req.header("email");
  const [isValidSessionToken, response] = await isSessionTokenValid({
    email,
    encryptedSessionToken: session_token,
    c,
  });

  if (isValidSessionToken == false) {
    return response;
  }

  const sessionToken = generateUniqueToken();
  const encryptedSessionToken = encrypt(sessionToken);

  // TODO: finish the rest later

  return c.text("Request logged and response from middleware!", 200);
};

async function isSessionTokenValid({
  email,
  encryptedSessionToken,
  c,
}: IsSessionTokenValid) {
  if (!email || !encryptedSessionToken) {
    return [
      false,
      badRequestResponse({ c, message: "invalid sessionToken or email" }),
    ];
  }

  const user = await getUser({ email });

  if (user == null) {
    return [
      false,
      forbiddenResponse({ c, message: "this email is unregistered" }),
    ];
  }

  const { session_token } = user;
  const sessionToken = decrypt(encryptedSessionToken);

  if (session_token != sessionToken) {
    return [false, badRequestResponse({ c, message: "invalid session_token" })];
  }

  return [true, null];
}
