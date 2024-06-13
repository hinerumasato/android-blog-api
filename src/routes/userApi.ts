import express from "express";
import userController from "@/controllers/userController";
const userApiRouter = express.Router();

userApiRouter.get('/', userController.findAll);
userApiRouter.get('/:id', userController.findById);
userApiRouter.post('/', userController.create);
userApiRouter.put('/:id', userController.update);
userApiRouter.delete('/:id', userController.delete);


export { userApiRouter }