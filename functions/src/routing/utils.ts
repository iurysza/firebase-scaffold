import * as admin from "firebase-admin";
import * as express from "express";
import * as functions from "firebase-functions";
import { reportError } from "../application/helpers/utils";
/**
 * Similar to express-unless; this skips the middleware,
 * if the request.path is in the array of paths (both passed to this function)
 *
 * @param paths Request paths that do not pass through the middleware
 * @param middleware Middleware that is in being skipped
 */
export const unless = (
  paths: Array<string>,
  middleware: (
    request: functions.Request,
    response: functions.Response,
    next: () => any
  ) => any
) => {
  return (
    request: functions.Request,
    response: functions.Response,
    next: () => any
  ): any => {
    if (paths.includes(request.path)) return next();
    else return middleware(request, response, next);
  };
};

/**
 * Validate authorization token passed in the authorization field of the request header
 *
 * @param request express request
 * @param response express response
 * @param next go to the next
 */
export const validateAuthToken = async (
  request: express.Request,
  response: express.Response,
  next: () => any
) => {
  const { authorization } = request.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return response.status(401).send({
      message:
        "Unauthorized: Authorize your request - Authorization: Bearer <idToken>",
      code: "authentication-error",
    });
  }

  try {
    const authToken = authorization.split("Bearer ")[1];
    const decodedToken = await admin.auth().verifyIdToken(authToken);

    request["user"] = decodedToken;
    return next();
  } catch (error) {
    await reportError(error, request, {});
    const { code } = error;
    console.error(new Error(error.message));
    if (code === "auth/argument-error") {
      // Firebase ID Token error
      return response.status(401).send({
        message: "Unauthorized: Incomplete arguments passed",
        code: "authentication-error",
      });
    }

    if (code === "auth/id-token-expired") {
      return response.status(401).send({
        message: "Unauthorized: Refresh idToken",
        code: "authentication-error",
      });
    }

    return response.status(401).send({
      message: "Unauthorized",
      code: "authentication-error",
    });
  }
};
