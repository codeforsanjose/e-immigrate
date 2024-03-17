export type SendGridResponseError = {
    response: { body: unknown };
}

export function isSendGridResponseError(err: unknown): err is SendGridResponseError {
    if (err == null) return false;
    else if (!(err instanceof Error)) return false;
    return true;
}