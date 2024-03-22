import { NextFunction, Request, Response } from "express";
import { ErrorMiddleware } from "../../types/Middleware.js";
import { scopedLogger } from "../../features/logging/logger.js";
const DEFAULT_ERROR_CODE = 400;

const logger = scopedLogger('UncaughtErrorMiddleware');
/**
 *  Middleware which returns a 400 status code when an uncaught
 * {@link Error} is thrown.
 * @export
 * @returns
 */
export function handleUncaughtErrorMiddleware(): ErrorMiddleware {
    return (err: Error, req: Request, res: Response, next: NextFunction) => {
        logger.error({ 
            err, 
            request: req.url,
            errMessage: err.message,
        });
        const errorStatus = DEFAULT_ERROR_CODE;
        res.status(errorStatus).send();
        return;
    };
}