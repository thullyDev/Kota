import type { Context } from "hono";
import {
  FORBIDDEN,
  CRASH,
  SUCCESSFUL,
  NOT_FOUND,
  FORBIDDEN_MSG,
  CRASH_MSG,
  SUCCESSFUL_MSG,
  NOT_FOUND_MSG,
  BAD_REQUEST,
  BAD_REQUEST_MSG,
} from "../utilities/errors";
import type { StatusCode } from "hono/utils/http-status";
import type { Data, ResponseArgs } from "../types/responseTypes";

const jsonResponse = (
  c: Context,
  statusCode: StatusCode,
  data: Data,
): Response => {
  return c.json(data, statusCode) as unknown as Response; // enforcing this to be Response
};

const createContext = (
  c: Context,
  data: Data,
  statusCode: number,
  message: string,
): Data => {
  const url = c.req.url.toString();

  if (url.includes("/api/") && statusCode == SUCCESSFUL) {
    // checks if the request is for the api router,
    // and if so we send back a new encrypted session_token to the request,
    // only if the statusCode is 200

    const encryptedSessionToken = c.get("encryptedSessionToken");

    if (!encryptedSessionToken) {
      // TODO: uncomment this later

      // throw new Error("no encryptedSessionToken found");
    }

    data["session_token"] = encryptedSessionToken;
  }

  return {
    message,
    status_code: statusCode,
    data,
  };
};

export const forbiddenResponse = ({
  c,
  data = {},
  message = FORBIDDEN_MSG,
}: ResponseArgs) => {
  const context = createContext(c, data, FORBIDDEN, message);
  return jsonResponse(c, FORBIDDEN, context);
};

export const successfulResponse = ({
  c,
  data = {},
  message = SUCCESSFUL_MSG,
}: ResponseArgs) => {
  const context = createContext(c, data, SUCCESSFUL, message);
  return jsonResponse(c, SUCCESSFUL, context);
};

export const notFoundResponse = ({
  c,
  data = {},
  message = NOT_FOUND_MSG,
}: ResponseArgs) => {
  const context = createContext(c, data, NOT_FOUND, message);
  return jsonResponse(c, NOT_FOUND, context);
};

export const crashResponse = ({
  c,
  data = {},
  message = CRASH_MSG,
}: ResponseArgs) => {
  const context = createContext(c, data, CRASH, message);
  return jsonResponse(c, CRASH, context);
};

export const badRequestResponse = ({
  c,
  data = {},
  message = BAD_REQUEST_MSG,
}: ResponseArgs) => {
  const context = createContext(c, data, BAD_REQUEST, message);
  return jsonResponse(c, BAD_REQUEST, context);
};
