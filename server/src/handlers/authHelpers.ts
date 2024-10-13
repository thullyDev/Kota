import { decrypt } from "../utilities/misc";
import type { IsValidLogin, IsValidSignup } from "../types/authHelpersTypes";

export function isValidLogin({ user, password }: IsValidLogin) {
  if (user == null) {
    return [false, "unregisted email"];
  }

  const { encrypted_password } = user;
  const userPassword = decrypt(encrypted_password);

  if (userPassword != password) {
    return [false, "password is invalid"];
  }

  return [true, null];
}

export function isValidSignup({ user, password, confirm }: IsValidSignup) {
  if (user != null) {
    return [false, "email already registed"];
  }

  if (password != confirm) {
    return [false, "password and confirm should match"];
  }

  if (password.length < 10) {
    return [false, "password should at least have 10 characters"];
  }

  return [true, null];
}