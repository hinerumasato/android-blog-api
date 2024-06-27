import { AccessToken } from "@/interfaces";
import { NextFunction, Request, Response } from "express";

export const authorization = (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    const session = req.session;

    if (!bearer) {
        return res.status(401).json({ message: 'Unauthorized, you need add access token into authorization header', statusCode: 401 });
    }

    if (!bearer.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Prefix Bearer not found', statusCode: 401 });
    }

    const token = bearer;
    const accessTokens = session.accessTokens as AccessToken;

    if (!accessTokens[token]) {
        return res.status(401).json({ message: 'Invalid token', statusCode: 401 });
    }

    if (accessTokens[token].expires < Date.now()) {
        delete accessTokens[token];
        return res.status(401).json({ message: 'Token expired', statusCode: 401 });
    }

    next();
}