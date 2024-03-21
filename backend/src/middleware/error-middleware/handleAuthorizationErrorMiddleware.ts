import { NextFunction, Request, Response } from "express";
import { ErrorMiddleware } from "../../types/Middleware.js";
import { AuthorizationError } from "../../errors/AuthorizationError.js";


/**
 *  Middleware which returns a 403 status code when a 
 * {@link AuthorizationError} is thrown.
 * @export
 * @returns
 */
export function handleAuthorizationErrorMiddleware(): ErrorMiddleware {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AuthorizationError) {
      console.error(err, err.message);
      if (err.responsePayload == null) {
        res.status(403).send();
      }
      else {
        res.status(403).send(err.responsePayload);
      }
      return;
    }
    next(err);
  };
}