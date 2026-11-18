// One class for every error the api returns

import createDebug from "debug";
const debugError500 = createDebug("app:error500");

class ApiError {
  constructor(code, message, err) {
    this.code = code; // HTTP Status
    this.message = message; // what user sees
    this.err = err; // real error for logs
  }

  // 400 -> the data sent was wrong
  static badRequest(msg) {
    return new ApiError(400, `Bad Request: ${msg}`);
  }
  // 401 -> no token or bad token
  static unauthorized(msg) {
    return new ApiError(401, `Unauthorized: ${msg}`);
  }

  // 403 -> logged in but not allowed -> NOT ADMIN
  static forbidden(msg) {
    return new ApiError(403, `Forbidden: ${msg}`);
  }

  // 404 -> no such URL or item
  static notFound(msg = "Resource Not Found") {
    return new ApiError(404, msg);
  }

  //  413 -> file too big
  static tooLarge(msg) {
    return new ApiError(413, `Upload Failed: ${msg}`);
  }

  // 422 -> Wrong file type
  static cannotProcess(msg) {
    return new ApiError(422, `Upload Failed: ${msg}`);
  }

  // 500 -> Our fault, log the error and send friendly message
  static internal(msg, err) {
    debugError500(err);
    return new ApiError(500, `Internal Server Error: ${msg}`);
  }
}

export default ApiError;
