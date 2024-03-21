import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ErrorMiddleware } from "../../types/Middleware.js";
import { scopedLogger } from "../../features/logging/logger.js";

const RESPOND_WITH_ISSUES_BY_DEFAULT = true;

type ZodErrorMiddlewareConfig = {
    respondWithIssues?: boolean;
};
const logger = scopedLogger('ZodErrorMiddleware');
/**
 *  Middleware which returns a 409 status code when a 
 * {@link ZodError} is thrown.
 * @export
 * @returns
 */
export function handleZodErrorMiddleware(config: ZodErrorMiddlewareConfig = {}): ErrorMiddleware {
    const {
        respondWithIssues = RESPOND_WITH_ISSUES_BY_DEFAULT,
    } = config;
    return (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ZodError) {
            logger.error(err, 'ZodErrorMiddleware encountered an error');
            if (respondWithIssues) {
                res.status(409).send(err.issues);
            }
            else {
                res.status(409).send();
            }
            return;
        }
        next(err);
    };
}