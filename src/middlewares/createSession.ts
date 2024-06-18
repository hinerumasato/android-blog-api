import { AccessToken } from "@/interfaces";
import { NextFunction, Request, Response } from "express";

export const createSession = (req: Request, res: Response, next: NextFunction) => {
    const session = req.session;
    if(!session.accessTokens) {
        console.log("create new instance");
        session.accessTokens = {} as AccessToken;
    }
    next();
        
}