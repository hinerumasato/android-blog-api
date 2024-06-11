import postController from "@/controllers/postController";
import express, { Router } from "express";

const apiRouter: Router = express.Router();

apiRouter.use('/v1', apiRouter);
apiRouter.get('/posts', postController.getAllPosts);
apiRouter.post('/posts', postController.createPost);

export { apiRouter };

