/**
 *  Represents an error that will be reported to the user.
 *
 * @export
 * @class RequestError
 * @extends {Error}
 */
export class RequestError extends Error {
    static JsonError(config: {
        message: string;
        statusCode: number;
        value: unknown;
    }) {
        const {
            message,
            statusCode,
            value,
        } = config;
        return new RequestError(message, JSON.stringify(value), statusCode, true);
    }

    constructor(
        readonly message: string, 
        readonly responsePayload?: string, 
        readonly statusCode?: number,
        readonly isJson?: boolean,
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
        this.name = RequestError.name; // stack traces display correctly now 
    }
}