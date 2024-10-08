import type { StatusCode } from "hono/utils/http-status";

export const SUCCESSFUL_MSG: string = "successful";
export const NOT_FOUND_MSG: string = "not found";
export const FORBIDDEN_MSG: string = "request forbidden";
export const CRASH_MSG: string = "unexpected issue";
export const BAD_REQUEST_MSG: string = "invalid request";

export const SUCCESSFUL: StatusCode = 200;
export const NOT_FOUND: StatusCode = 404;
export const FORBIDDEN: StatusCode = 403;
export const CRASH: StatusCode = 503;
export const BAD_REQUEST: StatusCode = 400;
