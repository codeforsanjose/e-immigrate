import jwt, { JwtPayload } from 'jsonwebtoken';
import { getRequiredJwtKey } from '../jwtKey/access.js';
export function verifyJwtAsync(userToken: string): Promise<string | jwt.JwtPayload | undefined> {
    return new Promise((resolve, reject) => {
        jwt.verify(userToken, getRequiredJwtKey(), (err, data) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(data);
        });
    })
}