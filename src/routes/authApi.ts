import authController from "@/controllers/authController";
import express from "express";
const authApiRouter = express.Router();

authApiRouter.post('/login', authController.login);
authApiRouter.get('/me', authController.me);

export { authApiRouter }