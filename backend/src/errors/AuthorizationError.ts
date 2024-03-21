export class AuthorizationError extends Error {
  constructor(readonly message: string, readonly responsePayload?: string) {
    super(`Unauthorized: ${message}`);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.name = AuthorizationError.name; // stack traces display correctly now 
  }
}