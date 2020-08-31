import { Logging } from "@google-cloud/logging";
import * as functions from "firebase-functions";

/**
 * Report error to Stackdriver logging
 *
 * @param error Error that occurred
 * @param request A http request | undefined if not a http function
 * @param context Context of the error
 */
export const reportError = (
  error: any,
  request?: functions.Request,
  context = {}
): Promise<any> => {
  let httpRequest: object;

  if (request) {
    httpRequest = {
      method: request.method,
      endpoint: request.path,
      url: request.originalUrl,
      userAgent: request.get("user-agent"),
      remoteIp: request.ip,
      headers: request.headers,
    };
  } else {
    httpRequest = {};
  }

  const logging = new Logging({ projectId: process.env.GCLOUD_PROJECT });

  const logName = "errors";
  const log = logging.log(logName);

  const metadata: object = {
    resource: {
      type: "cloud_function",
      labels: { function_name: process.env.FUNCTION_NAME },
    },
  };

  const errorEvent = {
    message: error.stack,
    context: { ...context, request: httpRequest },
  };

  return new Promise((resolve, reject) => {
    log.write(log.entry(metadata, errorEvent), (error) => {
      if (error) return reject(error);
      return resolve();
    });
  });
};
