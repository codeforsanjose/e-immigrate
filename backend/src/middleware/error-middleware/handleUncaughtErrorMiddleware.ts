import { NextFunction, Request, Response } from "express";
import { ErrorMiddleware } from "../../types/Middleware.js";
import { RequestError } from "../../errors/RequestError.js";
const DEFAULT_ERROR_CODE = 400;

/**
 *  Middleware which returns a 400 status code when an uncaught
 * {@link Error} is thrown.
 * @export
 * @returns
 */
export function handleUncaughtErrorMiddleware(): ErrorMiddleware {
    return (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error('[UncaughtErrorMiddleware]', { 
            err, 
            errMessage: err.message,
        });
        const errorStatus = DEFAULT_ERROR_CODE;
        res.status(errorStatus).send();
        return;
    };
}