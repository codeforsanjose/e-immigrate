import { NextFunction, Request, Response } from "express";
import { ErrorMiddleware } from "../../types/Middleware.js";
import { RequestError } from "../../errors/RequestError.js";
import { scopedLogger } from "../../features/logging/logger.js";
const DEFAULT_ERROR_CODE = 400;

const logger = scopedLogger('RequestErrorMiddleware');
/**
 *  Middleware which returns a 400 status code when a 
 * {@link RequestError} is thrown.
 * @export
 * @returns
 */
export function handleRequestErrorMiddleware(): ErrorMiddleware {
    return (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof RequestError) {
            logger.error(err, err.message);
            const errorStatus = err.statusCode ?? DEFAULT_ERROR_CODE;
            if (err.responsePayload == null) {
                res.status(errorStatus).send();
            }
            else {
                if (err.isJson === true) {
                    res.setHeader('Content-Type', 'application/json');
                }
                res.status(errorStatus).send(err.responsePayload);
            }
            return;
        }
        next(err);
    };
}