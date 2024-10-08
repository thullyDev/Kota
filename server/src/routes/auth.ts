import { Hono } from "hono";
import { createUser, getUser } from "../handlers/databaseService";
import { crashResponse, successfulResponse } from "../handlers/response";
import { createProfileAvatar, encrypt, generateToken } from "../utilities/misc";
import type { User } from "../types/databaseServiceTypes";
import { isValidLogin, isValidSignup } from "../handlers/authHelpers";

const auth = new Hono();

auth.post("/login", async (c) => {
  const data = await c.req.json();
  const { email, password } = data;
  const user = await getUser(email); //TODO: implement this
  const [isValid, response] = isValidLogin({ user, password, c });

  if (isValid == false) {
    return response as any;
  }

  const { name, profile_image_url } = user as User;
  const sessionToken = generateToken(); //TODO: implement this
  const encryptedSessionToken = encrypt(sessionToken); //TODO: implement this

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

auth.post("/signup", async (c) => {
  const data = await c.req.json();
  const { email, name, password, confirm } = data;
  const user = await getUser(email); //TODO: implement this
  const [isValid, response] = isValidSignup({ user, password, confirm, c });

  if (isValid == false) {
    return response as any;
  }

  const sessionToken = generateToken(); //TODO: implement this
  const encryptedSessionToken = encrypt(sessionToken); //TODO: implement this
  const encryptedPassword = encrypt(password); //TODO: implement this
  const profileImageUrl = await createProfileAvatar(name); //TODO: implement this
  const dbResponse = await createUser({
    email,
    name,
    encryptedPassword,
    sessionToken,
    profileImageUrl,
  }); //TODO: implement this

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
