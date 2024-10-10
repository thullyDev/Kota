import type { Context, Next } from "hono";
import { getUser, updateSessionToken } from "./databaseService";
import type { IsSessionTokenValid } from "../types/sessionTokenMilddlewareTypes";
import { badRequestResponse, crashResponse, forbiddenResponse } from "./response";
import { decrypt, encrypt, generateUniqueToken } from "../utilities/misc";
import type { UpdateSessionToken } from "../types/databaseServiceTypes";

export const sessionTokenValidator = async (c: Context, next: Next) => {
  const session_token = c.req.header("session_token");
  const email = c.req.header("email") 
  const [isValidSessionToken, response] = await isSessionTokenValid({
    email,
    encryptedSessionToken: session_token,
    c,
  });

  if (isValidSessionToken == false) {
    return response as Response;
  }

  const sessionToken = generateUniqueToken();
  const encryptedSessionToken = encrypt(sessionToken);
  c.set("encryptedSessionToken", encryptedSessionToken)

  const dbResponse = await updateSessionToken({ sessionToken, email } as UpdateSessionToken) 

  if (dbResponse == false) { 
    // the database couldnt update, 
    // most likely because it couldnt find the email
    return crashResponse({ c, message: "something went wrong with trying to update the sessionToken with the database"})
  }

  await next()
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
