import { BaseError, ApiError } from "./Errors";

export const handleError = (error: unknown): BaseError | ApiError => {
  let message = "Unknown Error";
  let statusCode = 500;

  // UNKNOWN ERROR
  if (!(error instanceof Error)) {
    console.error(message, error);
    return new BaseError(message, statusCode);
  }

  // API ERROR
  if ("status" in error && typeof error.status === "number") {
    console.error(`GitHub API error (${error.status}): ${error.message}`);

    switch (error.status) {
      case 400:
        message = "Bad Request: The request was invalid.";
        break;
      case 401:
        message = "Unauthorized: Authentication failed.";
        break;
      case 403:
        message =
          "Forbidden: The request is understood, but it has been refused or access is not allowed.";
        break;
      case 404:
        message = "Not Found: The requested resource could not be found.";
        break;
      case 422:
        message = "There are no results for this query";
        break;
      default:
        message = `Unhandled status code: ${error.status}`;
    }

    return new ApiError(message, error.status);
  }

  return new BaseError(error.message, statusCode);
};
