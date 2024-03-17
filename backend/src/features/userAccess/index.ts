import { Response } from "express";
import { setResponseLocalsValue, tryGetResponseLocalsValue } from "../locals/helpers.js";

const userLocalKey = 'eimmigrate:user-data' as const;

function storeUserForRequest(res: Response, user: unknown) {
  setResponseLocalsValue(res, userLocalKey, user);
}
function getUserForRequest(res: Response) {
    return tryGetResponseLocalsValue(res, userLocalKey);
}


export const userRequestAccessor = {
    get: getUserForRequest,
    set: storeUserForRequest,
};