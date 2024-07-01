import express from "express";
const commentApiRouter = express.Router();
import commentController from "@/controllers/commentController";
import { noUpload } from "@/configs/multer";
import { authorization } from "@/middlewares";

commentApiRouter.get("/", commentController.findAll);
commentApiRouter.get("/:id", commentController.findById);
commentApiRouter.post("/", noUpload, authorization, commentController.create);
commentApiRouter.put("/:id", noUpload, authorization, commentController.update);
commentApiRouter.delete("/:id", authorization, commentController.delete);

export { commentApiRouter };