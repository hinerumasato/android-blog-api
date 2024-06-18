import { Session } from "express-session";
import { User } from "@/models";
import { AccessToken } from "@/interfaces";

declare module 'express-session' {
    interface SessionData {
        accessTokens: AccessToken;
    }
}