import jwt from 'jsonwebtoken';
import { Request } from "express";
import { Admin } from '../models/admin.js';
import { Middleware } from '../types/Middleware.js';
import { userRequestAccessor } from '../features/userAccess/index.js';
import { getRequiredJwtKey } from '../features/jwtKey/access.js';
const ERRMSG = { error: { message: 'Not logged in or auth failed' } };


function getAuthToken(req: Request) {
    
    const authHeader = req.header?.('Authorization');
    if (authHeader == null || authHeader === '') return;
    const parts = authHeader.split(' ');
    if (parts.length < 2) throw new Error('Unsuported auth header');
    return parts[1];
}
//route for authentication with client's jwt
export const authMiddleware: Middleware = (req, res, next) => {
    const token = getAuthToken(req);
    if (token == null) return res.status(401).json(ERRMSG);
    jwt.verify(token, getRequiredJwtKey(), function (err, decodedToken) {
        if (err) {
            return res.status(401).json(ERRMSG);
        }
        else if (decodedToken == null) {
            return res.status(401).json(ERRMSG);
        }
        else if (typeof decodedToken === 'string') {
            console.error('The decoded token was a string somehow');
            return res.status(401).json(ERRMSG);
        }
        let email = decodedToken.email;
        Admin.findOne({ email: email })
            .exec()
            .then((admin) => {
                if (!admin) return res.status(404).json(ERRMSG);
                else {
                    let adminObj = JSON.parse(JSON.stringify(admin));
                    delete adminObj.password;
                    return adminObj;
                }
            })
            .then((body) => {
                userRequestAccessor.set(res, body);
                next();
            });
       
    });
    
};
