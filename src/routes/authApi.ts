import { noUpload } from "@/configs/multer";
import authController from "@/controllers/authController";
import { authorization } from "@/middlewares";
import express from "express";
const authApiRouter = express.Router();

authApiRouter.post('/login', noUpload, authController.login);
authApiRouter.get('/me', authorization, authController.me);
authApiRouter.post('/logout', noUpload, authController.logout);

export { authApiRouter };
