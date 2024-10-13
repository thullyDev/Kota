import type { Context, Next } from "hono";
import { getUser, updateSessionToken } from "./databaseService";
import type { IsSessionTokenValid } from "../types/sessionTokenMilddlewareTypes";
import {
  badRequestResponse,
  crashResponse,
  forbiddenResponse,
} from "./response";
import { generateUniqueToken } from "../utilities/misc";
import type { UpdateSessionToken } from "../types/databaseServiceTypes";
import { getCookie, setCookie } from "hono/cookie";

export const sessionTokenValidator = async (c: Context, next: Next) => {
  const oldSessionToken = getCookie(c, "session_token");
  const email = c.req.header("email");
  const [isValidSessionToken, response] = await isSessionTokenValid({
    email,
    oldSessionToken,
    c,
  });

  if (isValidSessionToken == false) {
    return response as Response;
  }

  const sessionToken = generateUniqueToken();
  const dbResponse = await updateSessionToken({
    sessionToken,
    email,
  } as UpdateSessionToken);

  setSessionTokenCookie(c, sessionToken)
  
  if (dbResponse == false) {
    // the database couldnt update
    return crashResponse({
      c,
      message:
        "something went wrong with trying to update the sessionToken with the database",
    });
  }

  await next();
};

async function isSessionTokenValid({
  email,
  oldSessionToken,
  c,
}: IsSessionTokenValid) {
  if (!email || !oldSessionToken) {
    return [
      false,
      badRequestResponse({ c, message: "invalid oldSessionToken or email" }),
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

  if (session_token != oldSessionToken) {
    return [false, badRequestResponse({ c, message: "invalid session_token" })];
  }

  return [true, null];
}
function setSessionTokenCookie(c: Context, sessionToken: string) {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
   setCookie(c, "session_token", sessionToken, {
    httpOnly: true,
    secure: true,
    expires, 
    path: '/', 
  });
}