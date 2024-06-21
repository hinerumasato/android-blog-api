import { NextFunction, Request, Response } from "express";

export const authorization = (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;
    const accessTokens = req.session.accessTokens;

    if (bearerToken && accessTokens && accessTokens[bearerToken]) {
        next();
    } else {
        res.status(401).json({
            statusCode: 401,
            message: "Unauthorized",
        });
    }
}