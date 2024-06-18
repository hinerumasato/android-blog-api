import { MigrationSynchronous } from "@/migration/synchronous";
import { apiRouter } from "@/routes/api";
import express, { Application } from "express";
import bodyParser from "body-parser";
import multer from "multer";
import session from "express-session";
import { configDotenv } from "dotenv";
import { createSession } from "@/middlewares";
configDotenv();

export const useMiddlewares = (app: Application) => {
    const upload = multer();
    app.use(upload.none());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
        secret: process.env.HASH_SECRET as string,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }))
    app.use(createSession);
    app.use("/api", apiRouter);
}

export const migrate = () => {
    const migration = new MigrationSynchronous();
    const needDrop = process.env.DB_NEED_DROP && process.env.DB_NEED_DROP === 'true' || false;
    if(needDrop) {
        migration.drop().then(() => {
            console.log("Drop all tables");
            
        })
    }
    migration.sync().then(() => {
        console.log('Migration successfully');
    })
}