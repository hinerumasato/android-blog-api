import express from "express";
import lovePostController from "@/controllers/lovePostController";
import { noUpload } from "@/configs/multer";
import { authorization } from "@/middlewares";
const lovePostApiRouter = express.Router();

lovePostApiRouter.get('/', lovePostController.findAll);
lovePostApiRouter.post('/', noUpload, authorization, lovePostController.love);
lovePostApiRouter.delete('/', noUpload, authorization, lovePostController.unlove);

export { lovePostApiRouter };