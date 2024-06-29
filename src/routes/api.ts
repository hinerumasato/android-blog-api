import express, { Router } from "express";
import { authApiRouter } from "./authApi";
import { categoryApiRouter } from "./categoryApi";
import { postApiRouter } from "./postApi";
import { userApiRouter } from "./userApi";
import { lovePostApiRouter } from "./lovePostApi";
const apiRouter: Router = express.Router();

apiRouter.use('/v1/posts', postApiRouter);
apiRouter.use('/v1/users', userApiRouter);
apiRouter.use('/v1/auth', authApiRouter);
apiRouter.use('/v1/categories', categoryApiRouter);
apiRouter.use('/v1/love-posts', lovePostApiRouter);

export { apiRouter };

