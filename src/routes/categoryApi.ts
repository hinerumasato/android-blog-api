import { noUpload } from "@/configs/multer";
import categoryController from "@/controllers/categoryController";
import express from "express";
const categoryApiRouter = express.Router();

categoryApiRouter.get('/', categoryController.findAll);
categoryApiRouter.get('/:id', categoryController.findById);
categoryApiRouter.post('/', noUpload, categoryController.create);
categoryApiRouter.put('/:id', noUpload, categoryController.update);
categoryApiRouter.delete('/:id', categoryController.delete);

export { categoryApiRouter }