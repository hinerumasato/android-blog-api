import express from "express";
import userController from "@/controllers/userController";
const userApiRouter = express.Router();

userApiRouter.post('/', userController.create);

export { userApiRouter }