import { Response } from "express";
import { setResponseLocalsValue, tryGetResponseLocalsValue } from "../locals/helpers.js";

const userLocalKey = 'eimmigrate:user-data' as const;

export type AdminObj = {
    _id: string;
    email: string;
    name: string;
};
function storeUserForRequest(res: Response, user: AdminObj) {
    setResponseLocalsValue(res, userLocalKey, user);
}
function getUserForRequest(res: Response): AdminObj | undefined {
    return tryGetResponseLocalsValue(res, userLocalKey);
}

export const userRequestAccessor = {
    get: getUserForRequest,
    set: storeUserForRequest,
};