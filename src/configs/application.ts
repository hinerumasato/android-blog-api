import { authorization, createSession } from "@/middlewares";
import { mkdir } from "@/middlewares/mkdir";
import { MigrationSynchronous } from "@/migration/synchronous";
import { apiRouter } from "@/routes/api";
import { configDotenv } from "dotenv";
import express, { Application } from "express";
import session from "express-session";
import path from 'path';
configDotenv();

export const useMiddlewares = (app: Application) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(session({
        secret: process.env.HASH_SECRET as string,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));
    app.use(mkdir);
    app.use(createSession);
    app.use("/api", apiRouter);
}

export const useStatic = (app: Application) => {
    app.use(express.static(path.join(process.cwd(), 'uploads')));
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