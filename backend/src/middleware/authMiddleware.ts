import jwt from 'jsonwebtoken';
import { Request } from "express";
import { Admin } from '../models/admin.js';
import { Middleware } from '../types/Middleware.js';
import { userRequestAccessor } from '../features/userAccess/index.js';
import { getRequiredJwtKey } from '../features/jwtKey/access.js';
import { verifyJwtAsync } from '../features/jwtVerify/index.js';
const ERRMSG = { error: { message: '[auth middleware]: Not logged in or auth failed' } };

function getAuthToken(req: Request) {
    const authHeader = req.header?.('Authorization');
    if (authHeader == null || authHeader === '') return;
    const parts = authHeader.split(' ');
    if (parts.length < 2) throw new Error('Unsupported auth header');
    return parts[1];
}
// route for authentication with client's jwt
export const authMiddleware: Middleware = async (req, res, next) => {
    const unverifiedToken = getAuthToken(req);
    if (unverifiedToken == null) return res.status(401).json(ERRMSG);
    let decodedToken: string | jwt.JwtPayload | undefined;
    try {
        decodedToken = await verifyJwtAsync(unverifiedToken);
    }
    catch (err) {
        return res.status(401).json(ERRMSG);
    }
    if (decodedToken == null) {
        return res
            .status(401)
            .json({ error: { message: 'Invalid JWT Token' } });
    }
    else if (typeof decodedToken === 'string') {
        console.error('The decoded token was a string somehow');
        return res.status(401).json(ERRMSG);
    }
    const email = decodedToken.email;
    const admin = await Admin.findOne({ email }).exec();

    if (!admin) return res.status(404).json(ERRMSG);
    
    const adminObj = JSON.parse(JSON.stringify(admin));
    delete adminObj.password;
    userRequestAccessor.set(res, adminObj);
    next();
};
