/**
 *  Represents an error that will be reported to the user.
 *
 * @export
 * @class RequestError
 * @extends {Error}
 */
export class RequestError extends Error {
    constructor(
      readonly message: string, 
      readonly responsePayload?: string, 
      readonly statusCode?: number,
    ) {
      super(message);
      Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
      this.name = RequestError.name; // stack traces display correctly now 
    }
  }