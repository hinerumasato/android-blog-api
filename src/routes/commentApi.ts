import express from "express";
const commentApiRouter = express.Router();
import commentController from "@/controllers/commentController";
import { noUpload } from "@/configs/multer";

commentApiRouter.get("/", commentController.findAll);
commentApiRouter.get("/:id", commentController.findById);
commentApiRouter.post("/", noUpload, commentController.create);
commentApiRouter.put("/:id", noUpload, commentController.update);
commentApiRouter.delete("/:id", commentController.delete);

export { commentApiRouter };