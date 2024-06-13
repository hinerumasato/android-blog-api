import express, { Router } from "express";
import { postApiRouter } from "./postApi";
import { userApiRouter } from "./userApi";
const apiRouter: Router = express.Router();

apiRouter.use('/v1/posts', postApiRouter);
apiRouter.use('/v1/users', userApiRouter);

export { apiRouter };

