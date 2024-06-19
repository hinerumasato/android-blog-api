import { noUpload } from "@/configs/multer";
import authController from "@/controllers/authController";
import express from "express";
const authApiRouter = express.Router();

authApiRouter.post('/login', noUpload, authController.login);
authApiRouter.get('/me', authController.me);
authApiRouter.post('/logout', noUpload, authController.logout);

export { authApiRouter };
