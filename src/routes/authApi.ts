import authController from "@/controllers/authController";
import express from "express";
const authApiRouter = express.Router();

authApiRouter.post('/login', authController.login);
authApiRouter.get('/me', authController.me);
authApiRouter.post('/logout', authController.logout);

export { authApiRouter }