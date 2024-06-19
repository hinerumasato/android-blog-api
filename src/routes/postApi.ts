import express from "express";
import postController from "@/controllers/postController";
import { thumbnailUpload } from "@/configs/multer";

const postApiRouter = express.Router();

postApiRouter.get('/', postController.getAllPosts);
postApiRouter.post('/', thumbnailUpload, postController.createPost);
postApiRouter.put('/:id', thumbnailUpload, postController.updatePost);
postApiRouter.delete('/:id', postController.deletePost);

export { postApiRouter }