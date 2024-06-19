import express from "express";
import userController from "@/controllers/userController";
import { avatarUpload } from "@/configs/multer";
const userApiRouter = express.Router();

userApiRouter.get('/', userController.findAll);
userApiRouter.get('/:id', userController.findById);
userApiRouter.post('/', avatarUpload, userController.create);
userApiRouter.put('/:id', avatarUpload, userController.update);
userApiRouter.delete('/:id', userController.delete);


export { userApiRouter }