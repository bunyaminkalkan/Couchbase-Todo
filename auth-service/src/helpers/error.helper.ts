import BaseError from "../errors/BaseError";
import APIError from "../errors/APIError";
import { DocumentNotFoundError } from "couchbase";
import { JsonWebTokenError } from "jsonwebtoken";

export const isTrustedError = (err: Error) => {
  if (err instanceof BaseError) return err.isOperational;
  return false;
};

export const errorFilter = (err: Error) => {
  // If the error is a trusted error and an instance of BaseError, return it directly
  if (isTrustedError(err) && err instanceof BaseError) return err;
  // Couchbae document not found error
  else if (err instanceof DocumentNotFoundError) {
    // @ts-ignore
    const id = err.cause.id;
    return new APIError(
      404,
      "DOCUMENT_NOT_FOUND",
      `No such document with ${id}`
    );
  }
  // JWT Error
  else if (err instanceof JsonWebTokenError) {
    // Invalid token
    if (err.message === "invalid token")
      return new APIError(
        403,
        "INVALID_ACCESS_TOKEN",
        "Provided access token is not valid"
      );
    // Token Expired
    else if (err.message === "jwt expired")
      return new APIError(
        403,
        "ACCESS_TOKEN_EXPIRED",
        "Provided access token is expired"
      );
    else if (err.message === "invalid signature")
      return new APIError(
        403,
        "INVALID_SIGNATURE",
        "Provided token signature is invalid"
      );
    else {
      return new APIError(
        500,
        "INTERNAL_SERVER_ERROR",
        "Something went wrong internaly"
      );
    }
  }

  return new APIError(
    500,
    "INTERNAL_SERVER_ERROR",
    "Something went wrong internaly"
  );
};
