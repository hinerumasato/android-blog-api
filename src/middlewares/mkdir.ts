import { Files } from "@/utils/Files";
import { configDotenv } from "dotenv";
import { NextFunction, Request, Response } from "express";
configDotenv();

export const mkdir = (req: Request, res: Response, next: NextFunction) => {
    if(process.env.UPLOAD_PATHS) {
        const paths = process.env.UPLOAD_PATHS.split(',');
        paths.forEach(path => {
            Files.createDirectory(process.env[path] as string);
        })
    }
    next();
}