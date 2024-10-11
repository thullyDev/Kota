import { Hono, type Context } from "hono";
import { createUser, getUser, updateSessionToken } from "../handlers/databaseService";
import {
  crashResponse,
  forbiddenResponse,
  successfulResponse,
} from "../handlers/response";
import {
  createProfileAvatar,
  encrypt,
  generateUniqueToken,
} from "../utilities/misc";
import type { UpdateSessionToken, User } from "../types/databaseServiceTypes";
import { isValidLogin, isValidSignup } from "../handlers/authHelpers";
import type { CxtAndMsg } from "../types/apiTypes";

const auth = new Hono();

auth.post("/login", async (c: Context) => {
  const data = await c.req.json();
  const { email, password } = data;
  const user = await getUser({ email });
  const [isValid, message] = isValidLogin({ user, password });

  if (isValid == false) {
    return forbiddenResponse({ c, message } as CxtAndMsg);
  }

  const { id, name, profile_image_url } = user as User;
  const sessionToken = generateUniqueToken();
  const encryptedSessionToken = encrypt(sessionToken);

    const dbResponse = await updateSessionToken({
      sessionToken,
      email,
    } as UpdateSessionToken);

    if (dbResponse == false) {
      // the database couldnt update
      return crashResponse({
        c,
        message:
          "something went wrong with trying to update the sessionToken with the database",
      });
    }

  return successfulResponse({
    c,
    data: {
      id,
      name,
      email,
      profile_image_url,
      encrypted_token: encryptedSessionToken,
    },
  });
});

auth.post("/signup", async (c: Context) => {
  const data = await c.req.json();
  const { email, name, password, confirm } = data;
  const user = await getUser({ email });
  const [isValid, message] = isValidSignup({ user, password, confirm });

  if (isValid == false) {
    return forbiddenResponse({ c, message } as CxtAndMsg);
  }

  const sessionToken = generateUniqueToken();
  const encryptedSessionToken = encrypt(sessionToken);
  const encryptedPassword = encrypt(password);
  const profileImageUrl = await createProfileAvatar(name);
  const userId = await createUser({
    email,
    name,
    encryptedPassword,
    sessionToken,
    profileImageUrl,
  });

  if (userId == null) {
    return crashResponse({
      c,
      message: "something went with database trying to create user",
    });
  }

  return successfulResponse({
    c,
    data: {
      id: userId,
      name,
      email,
      profile_image_url: profileImageUrl,
      encrypted_token: encryptedSessionToken,
    },
  });
});

export default auth;
