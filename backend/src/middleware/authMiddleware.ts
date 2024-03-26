import jwt from 'jsonwebtoken';
import { Request } from "express";
import { Admin } from '../models/admin.js';
import { Middleware } from '../types/Middleware.js';
import { AdminObj, userRequestAccessor } from '../features/userAccess/index.js';
import { verifyJwtAsync } from '../features/jwtVerify/index.js';
import { logger } from '../features/logging/logger.js';
const ERRMSG = { error: { message: '[auth middleware]: Not logged in or auth failed' } };

export function getAuthToken(req: Request) {
    const authHeader = req.header?.('Authorization');
    if (authHeader == null || authHeader === '') return;
    const parts = authHeader.split(' ');
    if (parts.length < 2) throw new Error('Unsupported auth header');
    return parts[1];
}
type GetVerifiedJwtResult =
| {
    success: false;
    reason: 'no_auth_token';
}
| {
    success: false;
    reason: 'failed-to-find';
    err: unknown;
}
| {
    success: false;
    reason: 'decoded-was-null';
}
| {
    success: false;
    reason: 'decoded-was-string';
    decoded: string;
}
| {
    success: true;
    value: jwt.JwtPayload;
}
;
export async function getVerifiedJwt(req: Request): Promise<GetVerifiedJwtResult> {
    const unverifiedToken = getAuthToken(req);
    if (unverifiedToken == null) {
        return {
            success: false,
            reason: 'no_auth_token',
        };
    }
    let decodedToken: string | jwt.JwtPayload | undefined;
    try {
        decodedToken = await verifyJwtAsync(unverifiedToken);
    }
    catch (err) {
        return {
            success: false,
            reason: 'failed-to-find',
            err,
        };
    }
    if (decodedToken == null) {
        return {
            success: false,
            reason: 'decoded-was-null',
        };
    }
    else if (typeof decodedToken === 'string') {
        return {
            success: false,
            reason: 'decoded-was-string',
            decoded: decodedToken,
        };
    }
    return {
        success: true,
        value: decodedToken,
    };
}
// route for authentication with client's jwt
export const authMiddleware: Middleware = async (req, res, next) => {
    const jwtInfo = await getVerifiedJwt(req);
    if (!jwtInfo.success) {
        if (jwtInfo.reason === 'no_auth_token') {
            return res.status(401).json(ERRMSG);
        }
        else if (jwtInfo.reason === 'failed-to-find') {
            return res.status(401).json(ERRMSG);
        }
        else if (jwtInfo.reason === 'decoded-was-null') {
            return res
                .status(401)
                .json({ error: { message: 'Invalid JWT Token' } });
        }
        else if (jwtInfo.reason === 'decoded-was-string') {
            logger.error('The decoded token was a string somehow');
            return res.status(401).json(ERRMSG);
        }
        jwtInfo satisfies never;
        throw new Error(`Unexpected error`);
    }
    const {
        value: decodedToken,
    } = jwtInfo;
    const email = decodedToken.email;
    const admin = await Admin.findOne({ email }).exec();

    if (admin?._id == null) return res.status(404).json(ERRMSG);
    
    const adminObj: AdminObj = {
        _id: admin._id.toString(),
        email: admin.email,
        name: admin.name,
    };
    userRequestAccessor.set(res, adminObj);
    next();
};
