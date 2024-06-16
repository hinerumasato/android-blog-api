import express from "express";
import postController from "@/controllers/postController";

const postApiRouter = express.Router();

postApiRouter.get('/', postController.getAllPosts);
postApiRouter.post('/', postController.createPost);
postApiRouter.put('/:id', postController.updatePost);
postApiRouter.delete('/:id', postController.deletePost);

export { postApiRouter }