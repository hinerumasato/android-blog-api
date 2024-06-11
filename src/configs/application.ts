import { MigrationSynchronous } from "@/migration/synchronous";
import { apiRouter } from "@/routes/api";
import express, { Application } from "express";
import bodyParser from "body-parser";
import multer from "multer";
export const useLibrary = (app: Application) => {
    const upload = multer();

    app.use(upload.any());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/api", apiRouter);
}

export const migrate = () => {
    const migration = new MigrationSynchronous();
    migration.sync().then(() => {
        console.log('Migration successfully');
    })
}