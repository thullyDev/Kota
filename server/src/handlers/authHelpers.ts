import type { Context } from "hono";
import { forbiddenResponse } from "./response";
import { decrypt } from "../utilities/misc";
import type { IsValidLogin, IsValidSignup } from "../types/authHelpersTypes";

export function isValidLogin({
  user,
  password,
  c,
}: IsValidLogin): [boolean, Context["json"] | null] {
  if (user == null) {
    const response = forbiddenResponse({ c, message: "unregisted email" });
    return [false, response];
  }

  const { encrypted_password } = user;
  const userPassword = decrypt(encrypted_password);

  if (userPassword != password) {
    const response = forbiddenResponse({ c, message: "password is invalid" });
    return [false, response];
  }

  return [true, null];
}

export function isValidSignup({
  user,
  password,
  confirm,
  c,
}: IsValidSignup): [boolean, Context["json"] | null] {
  console.log({ user });
  if (user != null) {
    const response = forbiddenResponse({
      c,
      message: "email already registed",
    });
    return [false, response];
  }

  if (password != confirm) {
    const response = forbiddenResponse({
      c,
      message: "password and confirm should match",
    });
    return [false, response];
  }

  if (password.length < 10) {
    const response = forbiddenResponse({
      c,
      message: "password should at least have 10 characters",
    });
    return [false, response];
  }

  return [true, null];
}
