import express, { Router } from "express";
import { postApiRouter } from "./postApi";
import { userApiRouter } from "./userApi";
import { authApiRouter } from "./authApi";
import { categoryApiRouter } from "./categoryApi";
const apiRouter: Router = express.Router();

apiRouter.use('/v1/posts', postApiRouter);
apiRouter.use('/v1/users', userApiRouter);
apiRouter.use('/v1/auth', authApiRouter);
apiRouter.use('/v1/categories', categoryApiRouter);

export { apiRouter };

