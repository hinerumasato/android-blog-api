import express from "express";
import postController from "@/controllers/postController";
import { thumbnailUpload } from "@/configs/multer";

const postApiRouter = express.Router();

postApiRouter.get('/', postController.getAllPosts);
postApiRouter.get('/:id', postController.getPostById);
postApiRouter.post('/', thumbnailUpload, postController.create);
postApiRouter.put('/:id', thumbnailUpload, postController.update);
postApiRouter.delete('/:id', postController.deletePost);

export { postApiRouter }