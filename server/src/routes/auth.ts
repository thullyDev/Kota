import { Hono } from "hono";
import { createUser, getUser } from "../handlers/databaseService";
import { crashResponse, successfulResponse } from "../handlers/response";
import {
  createProfileAvatar,
  encrypt,
  generateUniqueToken,
} from "../utilities/misc";
import type { User } from "../types/databaseServiceTypes";
import { isValidLogin, isValidSignup } from "../handlers/authHelpers";

const auth = new Hono();

auth.post("/login", async (c: Context) => {
  const data = await c.req.json();
  const { email, password } = data;
  const user = await getUser({ email });
  const [isValid, response] = isValidLogin({ user, password, c });

  if (isValid == false) {
    return response as any;
  }

  const { name, profile_image_url } = user as User;
  const sessionToken = generateUniqueToken();
  const encryptedSessionToken = encrypt(sessionToken);

  return successfulResponse({
    c,
    data: {
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
  const [isValid, response] = isValidSignup({ user, password, confirm, c });

  if (isValid == false) {
    return response as any;
  }

  const sessionToken = generateUniqueToken();
  const encryptedSessionToken = encrypt(sessionToken);
  const encryptedPassword = encrypt(password);
  const profileImageUrl = await createProfileAvatar(name);
  const dbResponse = await createUser({
    email,
    name,
    encryptedPassword,
    sessionToken,
    profileImageUrl,
  });

  if (dbResponse == false) {
    return crashResponse({
      c,
      message: "something went with database trying to create user",
    });
  }

  return successfulResponse({
    c,
    data: {
      name,
      email,
      profile_image_url: profileImageUrl,
      encrypted_token: encryptedSessionToken,
    },
  });
});

export default auth;
